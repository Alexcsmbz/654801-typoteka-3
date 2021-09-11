'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();
const {getAPI} = require(`../api`);

const api = getAPI();

router.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));
router.get(`/add`, (_, res) => res.render(`new-post`));
router.get(`/edit/:id`, async (req, res) => res.render(`edit-post`, {
  article: await api.getArticleById(req.params.id),
  categories: await api.getCategories(),
  comments: await api.getCommentsById(req.params.id),
}));
router.get(`/:id`, (_, res) => res.render(`post`));

module.exports = {articlesRouter: router};
