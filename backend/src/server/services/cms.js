const bcrypt = require('bcryptjs');
const _ = require('lodash');

const login = require('../db/login.js');
const question = require('../db/question.js');
const memo = require('../db/memo.js');
const info = require('../db/infos.js');

const { Client } = require('pg');
const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});
client.connect();

const getDeleted = (reqItems, id, type) =>
  question.getQuestionById(client, id).then(result => {
    switch (type) {
      case 'option':
        return _.differenceBy(
          result.rows[0].options,
          reqItems.filter(o => o.id !== undefined),
          'id'
        );
      case 'memo':
        return _.differenceBy(
          _.flatten(result.rows[0].options.map(row => row.memos)),
          _.flatten(reqItems.map(option => option.memos)),
          'id'
        );
    }
  });

const filterAlreadyExisting = items => items.filter(o => o.id !== undefined);

const filterNew = items => items.filter(o => o.id === undefined);

module.exports = {
  login: (username, password) =>
    new Promise((resolve, reject) =>
      login(username, client)
        .then(result => {
          if (result.rows.length > 0) {
            bcrypt.compare(password, result.rows[0].password, function (
              err,
              hashStatus
            ) {
              if (hashStatus && !err) {
                resolve(result.rows[0]);
              } else reject(403);
            });
          } else reject(403);
        })
        .catch(() => reject(503))
    ),
  getQuestions: id =>
    new Promise(
      (resolve, reject) =>
        id
          ? question
            .getQuestionById(client, id)
            .then(result => {
              resolve(result.rows[0]);
            })
            .catch(() => reject(503))
          : question
            .getAllQuestions(client)
            .then(result => {
              resolve(result.rows);
            })
            .catch(() => reject(503))
    ),
  createQuestion: query =>
    new Promise((resolve, reject) =>
      question
        .createQuestion(query, client)
        .then(res => {
          JSON.parse(query.options).map(item =>
            question
              .createOption(
                { option: item, question_id: res.rows[0].id },
                client
              )
              .then(optionRes =>
                item.memos.map(memo =>
                  question.createMemo(
                    {
                      memo,
                      option_id: optionRes.rows[0].id,
                    },
                    client
                  )
                )
              )
          );
          resolve(res.rows[0].id);
        })
        .catch(() => reject(503))
    ),
  deleteQuestion: id =>
    new Promise((resolve, reject) =>
      question
        .delete(id, client)
        .then(() => {
          resolve(200);
        })
        .catch(() => reject(503))
    ),
  updateQuestion: query =>
    new Promise((resolve, reject) =>
      question
        .updateQuestion(query, client)
        .then(() => {
          const options = JSON.parse(query.options);

          getDeleted(options, query.id, 'option').then(res =>
            res.map(item => question.deleteOption(item.id, client))
          );
          getDeleted(options, query.id, 'memo').then(res =>
            res.map(memo => question.deleteMemo(memo.id, client))
          );

          question.getQuestionById(client, query.id).then(result => {
            filterAlreadyExisting(options).map(item => {
              question.updateOption(item, client);
              filterAlreadyExisting(item.memos).map(oldMemo =>
                question.updateMemo(oldMemo, client)
              );
              filterNew(item.memos).map(memo =>
                question.createMemo({ memo, option_id: item.id }, client)
              );
            });

            filterNew(options).map(item =>
              question
                .createOption({ option: item, question_id: query.id }, client)
                .then(optionRes =>
                  item.memos.map(memo =>
                    question.createMemo(
                      {
                        memo,
                        option_id: optionRes.rows[0].id,
                      },
                      client
                    )
                  )
                )
            );

            resolve(200);
          });
        })
        .catch(() => reject(503))
    ),
  getSession: session => (_.isEmpty(session) ? false : session.userData),
  createMemo: answers =>
    new Promise((resolve, reject) =>
      memo
        .create(JSON.stringify(answers), client)
        .then(result => {
          resolve(result.rows);
        })
        .catch(() => reject(500))
    ),
  getMemo: id =>
    new Promise((resolve, reject) =>
      memo
        .get(id, client)
        .then(result => {
          resolve(result.rows);
        })
        .catch(() => reject(500))
    ),
  getInfo: () =>
    new Promise((resolve, reject) =>
      info
        .get(client)
        .then(result => {
          resolve(_.head(result.rows));
        })
        .catch(() => reject(500))
    ),
  saveInfo: infos =>
    new Promise((resolve, reject) =>
      info
        .set(infos, client)
        .then(() => {
          resolve(200);
        })
        .catch((err) => console.log(err))
    ),
};
