'use strict';

const fs = require(`fs`).promises;
const {
  MAX_ANNOUNCE_SENTENCES_AMOUNT,
  MAX_MONTHS_PERIOD,
  mockFilePaths,
} = require(`./constants`);
const {DEFAULT_AMOUNT, MOCK_FILENAME, MAX_ADS_AMOUNT} = require(`./constants`);
const {getRandomDate, getRandomInt, shuffle, readContent} = require(`./utils`);
const {ExitCode} = require(`src/constants`);
const chalk = require(`chalk`);

const generateAds = (
    /** @type {number} */ count,
    /** @type {string[]} */ titles,
    /** @type {string[]} */ categories,
    /** @type {string[]} */ sentences,
) => Array(count).fill({}).map(() => ({
  title: titles[getRandomInt(0, titles.length - 1)],
  announce: shuffle(sentences).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES_AMOUNT)).join(` `),
  fullText: shuffle(sentences).slice(0, sentences.length - 1).join(` `),
  createdDate: getRandomDate(
      new Date(new Date().getFullYear(), new Date().getMonth() - MAX_MONTHS_PERIOD, 1), new Date(),
  ),
  сategory: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
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
    const amountAd = Number.parseInt(amount, 10) || DEFAULT_AMOUNT;
    const [sentences, titles, categories] = await doInParallelFlow(mockFilePaths, readContent);

    const content = JSON.stringify(generateAds(amountAd, titles, categories, sentences));

    if (amount < MAX_ADS_AMOUNT) {
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
