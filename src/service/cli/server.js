'use strict';

const {DEFAULT_PORT} = require(`./constants`);
const {MOCK_FILENAME} = require(`./constants`);
const fs = require(`fs`).promises;
const fsSync = require(`fs`);
const express = require(`express`);
const {Router} = require(`express`);
const path = require(`path`);

const getDataFromCache = () => {
  let cache = null;

  return async (pathName) => {
    if (cache) {
      return cache;
    }

    cache = await fs.readFile(pathName);

    return cache;
  };
};

const isFileExist = (pathName) => fsSync.existsSync(path.resolve(__dirname, pathName));

const getAds = getDataFromCache();

const app = express();

// @ts-ignore
const router = new Router();

router.get(`/posts`, async (_, res) =>
  res.json(isFileExist(`../../../mocks.json`) ? JSON.parse(await getAds(MOCK_FILENAME)) : []));

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
