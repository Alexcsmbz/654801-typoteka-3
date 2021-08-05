'use strict';

const {
  MAX_ANNOUNCE_SENTENCES_AMOUNT,
  TITLES,
  SENTENCES,
  CATEGORIES,
  MAX_MONTHS_PERIOD,
} = require(`./constants`);
const dayjs = require(`dayjs`);

const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
const getRandomDate = (start, end) => dayjs(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).format(`YYYY-MM-DD HH:mm:ss`);

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

const generateAds = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES_AMOUNT)).join(` `),
    fullText: shuffle(SENTENCES).slice(0, SENTENCES.length - 1).join(` `),
    createdDate: getRandomDate(new Date(new Date().getFullYear(), new Date().getMonth() - MAX_MONTHS_PERIOD, 1), new Date()),
    сategory: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  getRandomInt,
  shuffle,
  generateAds,
};
