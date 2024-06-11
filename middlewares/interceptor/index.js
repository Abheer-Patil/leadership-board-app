const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next(); // Call next() to pass control to the next middleware or route handler
};

module.exports = { requestLogger };
