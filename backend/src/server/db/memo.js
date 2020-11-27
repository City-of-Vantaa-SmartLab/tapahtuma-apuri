module.exports = {
  create: (answers, client) => client.query(createMemoClause(), [answers]),
  get: (id, client) => client.query(getMemoClause(), [id]),
};

const createMemoClause = () => `
  INSERT INTO memo (memodata) VALUES ($1) RETURNING id::text
`;

const getMemoClause = () => `
  SELECT * FROM memo where id = $1;
`;
