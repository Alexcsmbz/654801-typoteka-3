"use strict";

const {HttpCode} = require(`../../constants`);

module.exports = (logger) => (err, _, res, next) => {
  if (err) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .end(`${HttpCode.INTERNAL_SERVER_ERROR}`);
    logger.error(`An error occured on processing request: ${err.message}`);
  }
  next();
};
