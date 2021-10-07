'use strict';

const sequelize = require(`../lib/sequelize`);
const {getLogger} = require(`../lib`);
const {MAX_ANNOUNCE_SENTENCES_AMOUNT, MAX_MONTHS_PERIOD, mockFilePaths, ID_LENGTH} = require(`./constants`);
const {DEFAULT_AMOUNT} = require(`./constants`);
const {getRandomDate, getRandomInt, shuffle, readContent} = require(`./utils`);
const {nanoid} = require(`nanoid`);
const initDatabase = require(`../lib/init-db`);

const generateComments = (/** @type {string[]} */ comments) =>
  comments.slice(0, getRandomInt(1, comments.length - 1)).map((c) => ({text: c, id: nanoid(ID_LENGTH)}));

const generateArticles = (
    /** @type {number} */ count,
    /** @type {string[]} */ titles,
    /** @type {string[]} */ categories,
    /** @type {string[]} */ sentences,
    /** @type {string[]} */ comments,
) => Array(count).fill({}).map(() => ({
  title: titles[getRandomInt(0, titles.length - 1)],
  announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES_AMOUNT)).join(` `),
  fullText: shuffle(sentences).slice(0, sentences.length - 1).join(` `),
  createdDate: getRandomDate(
      new Date(new Date().getFullYear(), new Date().getMonth() - MAX_MONTHS_PERIOD, 1), new Date(),
  ),
  img: {
    src: `https://picsum.photos/200/300`,
  },
  categories: getRandomSubarray(categories),
  id: nanoid(ID_LENGTH),
  comments: generateComments(comments),
}));

const doInParallelFlow = async (
    /** @type  {any[]} */ items,
    /** @type {(item: any) => Promise<any>} */ getItem,
) => await Promise.all(items.map(async (item) => await getItem(item)));

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
        ...items.splice(
            getRandomInt(0, items.length - 1), 1,
        ),
    );
  }
  return result;
};

module.exports = {
  name: `--filldb`,
  /**
   * @param {string[] | [any]} [args]
   */
  async run(args) {
    const [amount] = args;
    const articlesAmount = Number.parseInt(amount, 10) || DEFAULT_AMOUNT;
    const [sentences, titles, categories, comments] = await doInParallelFlow(mockFilePaths, readContent);
    const logger = getLogger({name: `api`});

    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }

    logger.info(`Connection to database established`);

    const articles = generateArticles(articlesAmount, titles, categories, sentences, comments);

    return initDatabase(sequelize, {articles, categories});
  },
};
