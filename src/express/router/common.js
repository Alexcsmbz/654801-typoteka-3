'use strict';

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/`, (_, res) => res.render(`main`));
router.get(`/register`, (_, res) => res.render(`sign-up`));
router.get(`/login`, (_, res) => res.render(`login`));
router.get(`/search`, (_, res) => res.render(`search-1`));

module.exports = {commonRouter: router};
