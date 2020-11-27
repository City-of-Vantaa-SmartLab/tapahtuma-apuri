const { Client } = require('pg');

const adminHash = 'FILL_ME_IN';

const client = new Client();
client.connect();
client.query(`INSERT INTO appuser (username, password)
              VALUES ('admin', '${adminHash}')
            `, (err) => { // eslint-disable-line
  client.query(`INSERT INTO question (title, info, parent_id, question_ordinal_first, question_ordinal_second, question_ordinal_third)
                VALUES
                ('Kolmas parentti', 'Moi mitä kuuluu', null, 3, null, null),
                ('Toine sub question: 2.3', '2.3', 2, 2, 3, null),
                ('Toimiiko tämä?', 'Tämä on ensimmäinen kysymys', null, 1, null, null),
                ('Toinen kysymys', 'Ekalla ei oo sub-groupeja, tällä on', null, 2, null, null),
                ('KOLMANNEN LEVELIN KYSYMYS', 'KOLMAS', 2, 2, 3, 1),
                ('2.2', 'Eka sub-question', 2, 2, 1, null)
                `, (err) => { // eslint-disable-line
    client.query(`INSERT INTO option (text, memos, additional_infos, question_id)
                    VALUES ('Vaihtoehto 1', '{"muista tämä", "https://google.com"}', '{"Tämäkin on hyvä huomioida", "https://google.com"}', 1)
                    `, (err) => { // eslint-disable-line
      if (err) console.error('Error while populating the database!'); //eslint-disable-line
      else console.info('Database populated'); //eslint-disable-line
      process.exit();
    });
  });
});