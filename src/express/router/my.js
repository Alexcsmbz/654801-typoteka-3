"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/`, (_, res) => res.render(`my`));
router.get(`/comments`, (_, res) => res.render(`comments`));

module.exports = {myRouter: router};
