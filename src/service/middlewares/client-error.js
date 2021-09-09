'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (logger) => (req, res) => {
  res.status(HttpCode.NOT_FOUND).end(`${HttpCode.NOT_FOUND}`);
  logger.error(`Route not found: ${req.url}`);
};
