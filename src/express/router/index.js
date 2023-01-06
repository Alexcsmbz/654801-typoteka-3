"use strict";

const {Router} = require(`express`);
const {articlesRouter} = require(`./articles`);
const {categoriesRouter} = require(`./categories`);
const {myRouter} = require(`./my`);
const {commonRouter} = require(`./common`);
// @ts-ignore
const router = new Router();

router.use(`/my`, myRouter);
router.use(`/articles`, articlesRouter);
router.use(`/categories`, categoriesRouter);
router.use(commonRouter);

module.exports = {router};
