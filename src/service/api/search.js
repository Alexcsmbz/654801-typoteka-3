'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

// @ts-ignore
const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, async (req, res) => {
    if (!req.query.query) {
      res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
      return;
    }

    res.status(HttpCode.OK).json(await service.search(req.query.query));
  });
};
