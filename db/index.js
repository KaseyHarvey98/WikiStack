const pg = require('pg');
const postgresUrl = 'postgres://localhost/wikistack';
const client = new pg.Client(postgresUrl);

client.connect();

module.exports = client;
