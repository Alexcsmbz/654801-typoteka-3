'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {articlesApi} = require(`../api`);

router.get(`/`, async (_, res) => res.render(`my`, {articles: await articlesApi.getArticles()}));
router.get(`/comments`, async (_, res) => res.render(`comments`, {comments: await articlesApi.getComments()}));

module.exports = {myRouter: router};
