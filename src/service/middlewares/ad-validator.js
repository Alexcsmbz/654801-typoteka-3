"use strict";

const {HttpCode} = require(`../../constants`);

const adKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newAd = req.body;
  const keys = Object.keys(newAd);
  const keysExists = adKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
