"use strict";

const {Router} = require(`express`);
const {MOCK_FILENAME} = require(`../cli/constants`);
const {getAds} = require(`../cli/utils`);
const {isFileExist} = require(`../cli/utils`);
// @ts-ignore
const router = new Router();

router.get(`/posts`, async (_, res) =>
  res.json(isFileExist(`../../../mocks.json`) ? JSON.parse(await getAds(MOCK_FILENAME)) : []));

module.exports = {commonRouter: router};
