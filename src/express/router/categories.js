"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/`, (_, res) => res.render(`all-categories`));

module.exports = {categoriesRouter: router};
