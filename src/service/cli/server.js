'use strict';

const {DEFAULT_PORT} = require(`./constants`);
const {MOCK_FILENAME} = require(`./constants`);
const fs = require(`fs`).promises;
const express = require(`express`);
const {Router} = require(`express`);

const getDataFromCache = () => {
  let cache = null;

  return async (path) => {
    if (cache) {
      return cache;
    }

    cache = await fs.readFile(path);

    return cache;
  };
};
const getAds = getDataFromCache();

const app = express();

// @ts-ignore
const router = new Router();

router.get(`/posts`, async (_, res) => res.json(JSON.parse(await getAds(MOCK_FILENAME))));


app.use(express.json());
app.use(router);

module.exports = {
  name: `--server`,
  /**
   * @param {[any]} [args]
   */
  run(args) {
    const [portFromArgs] = args;
    const port = Number.parseInt(portFromArgs, 10) || DEFAULT_PORT;

    app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
  },
};
