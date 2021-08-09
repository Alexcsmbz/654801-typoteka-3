'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const {DEFAULT_PORT} = require(`./constants`);
const {onClientConnect} = require(`./utils`);

module.exports = {
  name: `--server`,
  /**
   * @param {[any]} [args]
   */
  run(args) {
    const [portFromArgs] = args;
    const port = Number.parseInt(portFromArgs, 10) || DEFAULT_PORT;

    // @ts-ignore
    http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, () => {
      console.info(chalk.green(`Ожидаю соединений на ${port}`));
    })
    .on(`error`, ({message}) => {
      console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
    });
  },
};
