'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const {
  articleValidator,
  articleExist,
  articleCommentExist,
  articleCommentValidator,
} = require(`../middlewares`);

// @ts-ignore
const route = new Router();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, (_, res) => {
    res.status(HttpCode.OK).json(service.findAll());
  });

  route.get(`/:articleId`, articleExist(service), (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    res.status(HttpCode.CREATED).json(service.create(req.body));
  });

  route.put(`/:articleId`, articleExist(service), articleValidator, (req, res) => {
    res.status(HttpCode.OK).json(service.update(req.params.articleId, req.body));
  });

  route.delete(`/:articleId`, articleExist(service), (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).send(service.drop(article));
  });

  route.get(`/:articleId/comments`, articleExist(service), (_, res) => {
    const {article} = res.locals;
    res.status(HttpCode.OK).json(article.comments);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(service), articleCommentExist], (_, res) => {
    const {article, comment} = res.locals;
    service.dropComment(article, comment);
    res.status(HttpCode.OK).send(comment);
  });

  route.post(`/:articleId/comments`, [articleExist(service), articleCommentValidator], (req, res) => {
    const {article} = res.locals;
    res.status(HttpCode.CREATED).json(service.createComment(article, req.body));
  });
};
