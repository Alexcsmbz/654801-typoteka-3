"use strict";

const {Router} = require(`express`);
const {articleKeys} = require(`./constants`);
const {HttpCode} = require(`../../constants`);
const {
  articleExist,
  articleCommentExist,
  keysValidator,
} = require(`../middlewares`);
const {articleValidator} = require(`../middlewares`);

// @ts-ignore
const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;
    if (limit || offset) {
      result = await articleService.findPage({limit, offset, comments});
    } else {
      result = await articleService.findAll(comments);
    }
    res.status(HttpCode.OK).json(result);
  });

  route.get(`/:articleId`, articleExist(articleService), async (req, res) => {
    const article = await articleService.findOne(req.params.articleId);
    res.status(HttpCode.OK).json(article);
  });

  route.post(`/add`, articleValidator, async (req, res) => {
    res.status(HttpCode.CREATED).json(await articleService.create(req.body));
  });

  route.put(
    `/:articleId`,
    [
      articleExist(articleService),
      (...args) => keysValidator(...args, articleKeys),
    ],
    async (req, res) => {
      res
        .status(HttpCode.OK)
        .json(await articleService.update(req.params.articleId, req.body));
    }
  );

  route.delete(`/:articleId`, articleExist(articleService), async (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).send(await articleService.drop(article));
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).json(article.comments);
  });

  route.delete(
    `/:articleId/comments/:commentId`,
    [articleExist(articleService), articleCommentExist],
    async (_, res) => {
      const {article, comment} = res.locals;
      await articleService.dropComment(article, comment);
      res.status(HttpCode.OK).send(comment);
    }
  );

  route.post(
    `/:articleId/comments`,
    [articleExist(articleService)],
    async (req, res) => {
      const {articleId} = req.params;

      const comment = await commentService.create(articleId, req.body);

      return res.status(HttpCode.CREATED).json(comment);
    }
  );
};
