"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/`, (_, res) => res.send(`/`));
router.get(`/register`, (_, res) => res.send(`/register`));
router.get(`/login`, (_, res) => res.send(`/login`));
router.get(`/search`, (_, res) => res.send(`/search`));

module.exports = {commonRouter: router};
