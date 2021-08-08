'use strict';

const dayjs = require(`dayjs`);

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

module.exports = {
  getRandomInt,
  shuffle,
  getRandomDate,
};
