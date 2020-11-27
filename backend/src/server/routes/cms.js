const services = require('../services/cms');
const cors = require('cors');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.text();

module.exports = cmsRoutes = (app, client) => {
  app.get('/api', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/api/login', (req, res) => {
    services
      .login(req.query.username, req.query.pass)
      .then(result => {
        delete result.password;
        req.session.userData = result;
        res.sendStatus(200);
      })
      .catch(err => res.sendStatus(err));
  });

  app.get('/api/getQuestions', cors(), (req, res) => {
    services
      .getQuestions(req.query.id)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(err));
  });

  app.get('/api/createQuestion', (req, res) => {
    if (req.session.userData) {
      services
        .createQuestion(req.query)
        .then(id => res.send({ id }))
        .catch(err => res.sendStatus(err));
    } else res.sendStatus(403);
  });

  app.get('/api/deleteQuestion', (req, res) => {
    if (req.session.userData) {
      services
        .deleteQuestion(req.query.id)
        .then(status => res.sendStatus(status))
        .catch(err => res.sendStatus(err));
    } else res.sendStatus(403);
  });

  app.get('/api/updateQuestion', (req, res) => {
    if (req.session.userData) {
      services
        .updateQuestion(req.query)
        .then(status => res.status(status).send({}))
        .catch(err => res.status(err).send({}));
    } else res.sendStatus(403);
  });

  app.get('/api/getSession', (req, res) => {
    if (services.getSession(req.session))
      res.send(services.getSession(req.session));
    else res.sendStatus(403);
  });

  app.post('/api/createMemo', cors(), jsonParser, (req, res) => {
    const answers = (JSON.parse(req.body)).answers;
    services
      .createMemo(answers)
      .then(id => res.send(id))
      .catch(err => {
        console.error(err);
        return res.sendStatus(err);
      });
  });

  app.get('/api/getMemo', cors(), (req, res) => {
    services
      .getMemo(req.query.id)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(err));
  });

  app.get('/api/getInfo', cors(), (req, res) => {
    services
      .getInfo()
      .then(result => res.send(result))
      .catch(err => res.status(err).send({}));
  });

  app.post('/api/saveInfo', cors(), (req, res) => {
    if (req.session.userData) {
      services
        .saveInfo(JSON.parse(req.query.infos))
        .then(result => res.sendStatus(result))
        .catch(err => res.sendStatus(err));
    } else {
      res.sendStatus(403);
    }
  });
};
