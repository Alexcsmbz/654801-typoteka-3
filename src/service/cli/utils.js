'use strict';

const dayjs = require(`dayjs`);

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const getRandomDate = (start, end) =>
  dayjs(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
  ).format(`YYYY-MM-DD HH:mm:ss`);

const shuffle = (array) => {
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
