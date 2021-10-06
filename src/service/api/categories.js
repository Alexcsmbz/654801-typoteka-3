'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

// @ts-ignore
const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.findAll());
  });
};
