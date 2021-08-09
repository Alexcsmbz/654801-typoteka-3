'use strict';

const fs = require(`fs`).promises;
const dayjs = require(`dayjs`);
const chalk = require(`chalk`);
const {MOCK_FILENAME} = require(`./constants`);
const {HttpCode} = require(`src/constants`);

const getRandomInt = (/** @type {number} */ min, /** @type {number} */ max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomDate = (
    /** @type {{ getTime: () => number; }} */ start,
    /** @type {{ getTime: () => number; }} */ end,
) => dayjs(new Date(getRandomInt(start.getTime(), end.getTime()))).format(`YYYY-MM-DD HH:mm:ss`);


const shuffle = (/** @type {any[]} */ array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

const readContent = async (/** @type {string} */ filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(e));
    return [];
  }
};

const getHtmlDocumentTemplate = (/** @type {string} */ body) => `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>App</title>
      </head>
      <body>${body}</body>
    </html>`;

const sendResponse = (
    /** @type {any} */ res,
    /** @type {number} */ statusCode,
    /** @type {string} */ htmlDocumentBody,
) => {
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(getHtmlDocumentTemplate(htmlDocumentBody).trim());
};

const onClientConnect = async (/** @type {{ url: string; }} */ req, /** @type {any} */ res) => {
  switch (req.url) {
    case `/`:
      try {
        const content = await fs.readFile(MOCK_FILENAME);
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
  getRandomInt,
  shuffle,
  getRandomDate,
  readContent,
  onClientConnect,
};
