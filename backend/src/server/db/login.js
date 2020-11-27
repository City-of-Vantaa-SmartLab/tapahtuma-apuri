module.exports = login = (username, client) =>
  client.query(`SELECT * FROM appuser WHERE username = '${username}'`);
