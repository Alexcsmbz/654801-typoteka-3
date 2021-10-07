'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {articlesApi} = require(`../api`);

router.get(`/`, async (_, res) => {
  const [articles, categories] = await Promise.all([articlesApi.getArticles(), articlesApi.getCategories(true)]);
  res.render(`main`, {articles, categories});
});
router.get(`/register`, (_, res) => res.render(`sign-up`));
router.get(`/login`, (_, res) => res.render(`login`));
router.get(`/search`, (_, res) => res.render(`search-1`));

module.exports = {commonRouter: router};
