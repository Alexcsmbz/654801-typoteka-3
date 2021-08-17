"use strict";

const {Router} = require(`express`);
// @ts-ignore
const router = new Router();

router.get(`/`, (_, res) => res.send(`/my`));
router.get(`/comments`, (_, res) => res.send(`/my/comments`));

module.exports = {myRouter: router};
