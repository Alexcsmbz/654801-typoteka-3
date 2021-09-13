'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {articlesApi} = require(`../api`);

router.get(`/`, async (_, res) => res.render(`main`, {articles: await articlesApi.getArticles()}));
router.get(`/register`, (_, res) => res.render(`sign-up`));
router.get(`/login`, (_, res) => res.render(`login`));
router.get(`/search`, (_, res) => res.render(`search-1`));

module.exports = {commonRouter: router};
