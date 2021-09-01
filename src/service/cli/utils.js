'use strict';

const fs = require(`fs`).promises;
const dayjs = require(`dayjs`);
const chalk = require(`chalk`);
const fsSync = require(`fs`);
const path = require(`path`);

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

module.exports = {
  getRandomInt,
  shuffle,
  getRandomDate,
  readContent,
  isFileExist,
  getAds,
};
