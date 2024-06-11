const { Pool } = require("pg");
const config = require("./index");

const pool = new Pool(config.getDbOptions());


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
