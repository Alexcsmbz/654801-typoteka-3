'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {getAPI} = require(`../api`);

const api = getAPI();

router.get(`/`, async (_, res) => res.render(`main`, {articles: await api.getArticles()}));
router.get(`/register`, (_, res) => res.render(`sign-up`));
router.get(`/login`, (_, res) => res.render(`login`));
router.get(`/search`, (_, res) => res.render(`search-1`));

module.exports = {commonRouter: router};
