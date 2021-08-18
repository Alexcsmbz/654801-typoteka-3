"use strict";

const {Router} = require(`express`);
const {articlesRouter} = require(`../router/articles`);
const {categoriesRouter} = require(`../router/categories`);
const {myRouter} = require(`../router/my`);
const {commonRouter} = require(`../router/common`);
// @ts-ignore
const router = new Router();

router.use(`/my`, myRouter);
router.use(`/articles`, articlesRouter);
router.use(`/categories`, categoriesRouter);
router.use(commonRouter);

module.exports = {router};
