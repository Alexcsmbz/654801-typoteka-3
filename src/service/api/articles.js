"use strict";

const {Router} = require(`express`);
const {articleKeys, commentKeys} = require(`./constants`);
const {HttpCode} = require(`../../constants`);
const {
  articleExist,
  articleCommentExist,
  keysValidator,
} = require(`../middlewares`);

// @ts-ignore
const route = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    res.status(HttpCode.OK).json(await service.findAll(req.query.comments));
  });

  route.get(`/:articleId`, articleExist(service), (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).json(article);
  });

  route.post(
    `/`,
    (...args) => keysValidator(...args, articleKeys),
    async (req, res) => {
      res.status(HttpCode.CREATED).json(await service.create(req.body));
    }
  );

  route.put(
    `/:articleId`,
    [articleExist(service), (...args) => keysValidator(...args, articleKeys)],
    async (req, res) => {
      res
        .status(HttpCode.OK)
        .json(await service.update(req.params.articleId, req.body));
    }
  );

  route.delete(`/:articleId`, articleExist(service), async (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).send(await service.drop(article));
  });

  route.get(`/:articleId/comments`, articleExist(service), (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).json(article.comments);
  });

  route.delete(
    `/:articleId/comments/:commentId`,
    [articleExist(service), articleCommentExist],
    async (_, res) => {
      const {article, comment} = res.locals;
      await service.dropComment(article, comment);
      res.status(HttpCode.OK).send(comment);
    }
  );

  route.post(
    `/:articleId/comments`,
    [articleExist(service), (...args) => keysValidator(...args, commentKeys)],
    async (req, res) => {
      const {article} = res.locals;
      res
        .status(HttpCode.CREATED)
        .json(await service.createComment(article, req.body));
    }
  );
};
