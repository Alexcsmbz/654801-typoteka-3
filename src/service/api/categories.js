"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

// @ts-ignore
const router = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, router);

  router.get(`/`, (_, res) => {
    res.status(HttpCode.OK).json(service.findAll());
  });
};
