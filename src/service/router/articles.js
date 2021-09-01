"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

// @ts-ignore
const router = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, router);

  router.get(`/`, async (req, res) => {
    res.status(HttpCode.OK).json(await service.findAll());
  });
  router.get(`/:articleId`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.findOne(res.params.articleId));
  });
  router.post(`/`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.create());
  });
  router.put(`/:articleId`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.update(res.params.articleId));
  });
  router.delete(`/:articleId`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.remove(res.params.articleId));
  });
  router.get(`/:articleId/comments`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.findAll());
  });
  router.delete(`/:articleId/comments/:commentId`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.remove());
  });
  router.post(`/:articleId/comments`, async (_, res) => {
    res.status(HttpCode.OK).json(await service.create());
  });
};
