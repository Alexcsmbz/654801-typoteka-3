'use strict';

const {DEFAULT_PORT, API_PREFIX} = require(`./constants`);
const express = require(`express`);
const routes = require(`../api`);

const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

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
