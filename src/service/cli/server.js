'use strict';

const {DEFAULT_PORT, API_PREFIX} = require(`./constants`);
const express = require(`express`);
const initRoutes = require(`../api`);
const {Router} = require(`express`);
const {getLogger} = require(`../lib`);

module.exports = {
  name: `--server`,
  /**
   * @param {[any]} [args]
   */
  async run(args) {
    const [portFromArgs] = args;
    const port = Number.parseInt(portFromArgs, 10) || DEFAULT_PORT;
    const logger = getLogger({name: `api`});
    const app = express();
    // @ts-ignore
    const routes = new Router();

    app.use(express.json());
    app.use(API_PREFIX, await initRoutes(routes));

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
  },
};
