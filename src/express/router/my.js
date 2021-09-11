'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {getAPI} = require(`../api`);

const api = getAPI();

router.get(`/`, async (_, res) => res.render(`my`, {articles: await api.getArticles()}));
router.get(`/comments`, async (_, res) => res.render(`comments`, {comments: await api.getComments()}));

module.exports = {myRouter: router};
