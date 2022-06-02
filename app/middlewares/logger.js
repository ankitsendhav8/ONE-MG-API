module.exports = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${new Date()}::${req.originalUrl}`);
  next();
};
