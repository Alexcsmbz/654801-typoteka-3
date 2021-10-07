'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {articlesApi} = require(`../api`);

router.get(`/`, async (_, res) => res.render(`my`, {articles: await articlesApi.getArticles()}));
router.get(`/comments`, async (_, res) => {
  const articles = await articlesApi.getArticles({comments: true});
  res.render(`comments`, {articles: articles.slice(0, 3)});
});

module.exports = {myRouter: router};
