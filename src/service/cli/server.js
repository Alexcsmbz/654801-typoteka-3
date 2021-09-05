'use strict';

const {DEFAULT_PORT, API_PREFIX} = require(`./constants`);
const express = require(`express`);
const initRoutes = require(`../api`);
const {Router} = require(`express`);

module.exports = {
  name: `--server`,
  /**
   * @param {[any]} [args]
   */
  async run(args) {
    const [portFromArgs] = args;
    const port = Number.parseInt(portFromArgs, 10) || DEFAULT_PORT;

    const app = express();
    // @ts-ignore
    const routes = new Router();

    app.use(express.json());
    app.use(API_PREFIX, await initRoutes(routes));

    app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
  },
};
