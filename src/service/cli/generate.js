'use strict';

const fs = require(`fs`).promises;
const {MAX_ANNOUNCE_SENTENCES_AMOUNT, mockFilePaths, ID_LENGTH} = require(`./constants`);
const {DEFAULT_AMOUNT, MOCK_FILENAME, MAX_ARTICLES_AMOUNT} = require(`./constants`);
const {getRandomInt, shuffle, readContent} = require(`./utils`);
const {ExitCode} = require(`src/constants`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

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
  img: `https://picsum.photos/200/300`,
  categories: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
  comments: generateComments(comments),
}));

const doInParallelFlow = async (
    /** @type  {any[]} */ items,
    /** @type {(item: any) => Promise<any>} */ getItem,
) => await Promise.all(items.map(async (item) => await getItem(item)));

module.exports = {
  name: `--generate`,
  /**
   * @param {string[] | [any]} [args]
   */
  async run(args) {
    const [amount] = args;
    const articlesAmount = Number.parseInt(amount, 10) || DEFAULT_AMOUNT;
    const [sentences, titles, categories, comments] = await doInParallelFlow(mockFilePaths, readContent);

    const content = JSON.stringify(generateArticles(articlesAmount, titles, categories, sentences, comments));
    if (articlesAmount < MAX_ARTICLES_AMOUNT) {
      try {
        await fs.writeFile(MOCK_FILENAME, content);
        console.log(chalk.green(`Operation success. File created.`));
      } catch (e) {
        console.error(chalk.red(`Can't write data to file...`));
        process.exit(ExitCode.ERROR);
      }
    }
  },
};
