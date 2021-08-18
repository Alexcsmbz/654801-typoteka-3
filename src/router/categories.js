"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/`, (_, res) => res.send(`/categories`));

module.exports = {categoriesRouter: router};
