"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {articlesApi} = require(`../api`);
const {ITEMS_PER_PAGE} = require("../constants");

router.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = ITEMS_PER_PAGE;

  const offset = (page - 1) * ITEMS_PER_PAGE;
  const [{count, articles}, categories] = await Promise.all([
    articlesApi.getArticles({limit, offset, comments: false}),
    articlesApi.getCategories(true),
  ]);

  const totalPages = Math.ceil(count / limit);

  res.render(`main`, {articles, page, totalPages, categories});
});
router.get(`/register`, (_, res) => res.render(`sign-up`));
router.get(`/login`, (_, res) => res.render(`login`));
router.get(`/search`, (_, res) => res.render(`search-1`));

module.exports = {commonRouter: router};
