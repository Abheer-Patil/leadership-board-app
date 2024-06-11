const PORT = process.env.PORT || 4000;

const options = {
  password: process.env.DB_PASSWORD || "root",
  user: process.env.DB_USER || "postgres",
  database: process.env.DB_NAME || "lms",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "5432",
  max: 20, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // returns an error after 2 seconds if connection could not be established
};

const getDbOptions = () => {
  return options;
};

const getPortConfig = () => {
  return PORT;
};

module.exports = {
  getPortConfig,
  getDbOptions,
};
