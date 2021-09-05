'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (req, res, next, keys) => {
  if (!keys.every((key) => Object.keys(req.body).includes(key))) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
    return null;
  }

  return next();
};
