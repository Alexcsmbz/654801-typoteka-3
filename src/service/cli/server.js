'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const {DEFAULT_PORT} = require(`./constants`);
const {HttpCode} = require(`src/constants`);
const {sendResponse} = require(`./utils`);
const {MOCK_FILENAME} = require(`./constants`);
const fs = require(`fs`).promises;

const getDataFromCache = async (
    /** @type {any} */ cahce,
    /** @type {string} */ path,
) => cahce ? cahce : await fs.readFile(path);

const onClientConnect = async (/** @type {{ url: string; }} */ req, /** @type {any} */ res) => {
  let cache = null;
  const content = await getDataFromCache(cache, MOCK_FILENAME);

  switch (req.url) {
    case `/`:
      try {
        const mocks = JSON.parse(content.toString());
        const message = mocks.map((/** @type {{ title: string; }} */ post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, `Not found`);
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, `Not found`);
      break;
  }
  return;
};

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
