'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

// @ts-ignore
const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    if (!req.query.query || !service.search(req.query.query)) {
      res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
      return;
    }

    res.status(HttpCode.OK).json(service.search(req.query.query));
  });
};
