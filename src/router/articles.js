"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));
router.get(`/add`, (_, res) => res.render(`new-post`));
router.get(`/edit/:id`, (_, res) => res.render(`edit-post`));
router.get(`/:id`, (_, res) => res.render(`post`));

module.exports = {articlesRouter: router};
