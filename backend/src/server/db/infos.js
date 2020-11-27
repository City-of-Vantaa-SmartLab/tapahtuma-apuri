module.exports = {
  get: (client) => client.query(getInfoClause()),
  set: (query, client) => client.query(upsertInfoClause(query)),
};

const getInfoClause = (id) => `
      SELECT * FROM info LIMIT 1;
  `;

const upsertInfoClause = (query) => `
    INSERT INTO info ("id", "emptyGreetingHeader", "emptyGreetingBody", "readyGreetingHeader", "readyGreetingBody", "privateGreetingHeader", "privateGreetingBody")
    VALUES (1, '${query.emptyGreetingHeader}', '${query.emptyGreetingBody}', '${query.readyGreetingHeader}', '${query.readyGreetingBody}', '${query.privateGreetingHeader}', '${query.privateGreetingBody}')
    ON CONFLICT (id) DO UPDATE
    SET "emptyGreetingHeader"='${query.emptyGreetingHeader}',
        "emptyGreetingBody"='${query.emptyGreetingBody}',
        "readyGreetingHeader"='${query.readyGreetingHeader}',
        "readyGreetingBody"='${query.readyGreetingBody}',
        "privateGreetingHeader"='${query.privateGreetingHeader}',
        "privateGreetingBody"='${query.privateGreetingBody}';
`;
