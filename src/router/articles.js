"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/category/:id`, (req, res) => res.send(`/articles/category/${req.params.id}`));
router.get(`/add`, (_, res) => res.send(`/articles/add`));
router.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/${req.params.id}`));
router.get(`/:id`, (req, res) => res.send(`/articles/${req.params.id}`));

module.exports = {articlesRouter: router};
