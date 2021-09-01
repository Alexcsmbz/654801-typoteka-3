'use strict';

const {DEFAULT_PORT} = require(`./constants`);
const express = require(`express`);
const {router} = require(`../router`);

const app = express();

app.use(express.json());
app.use(`/api`, router);

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
