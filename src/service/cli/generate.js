'use strict';

const fs = require(`fs`).promises;
const {MAX_ANNOUNCE_SENTENCES_AMOUNT, TITLES, SENTENCES, CATEGORIES, MAX_MONTHS_PERIOD} = require(`./constants`);
const {DEFAULT_AMOUNT, FILE_NAME, MAX_ADS_AMOUNT} = require(`./constants`);
const {getRandomDate, getRandomInt, shuffle} = require(`./utils`);
const {ExitCode} = require(`src/constants`);
const chalk = require(`chalk`);

const generateAds = (/** @type {number} */ count) => Array(count).fill({}).map(() => ({
  title: TITLES[getRandomInt(0, TITLES.length - 1)],
  announce: shuffle(SENTENCES).slice(0, getRandomInt(1, MAX_ANNOUNCE_SENTENCES_AMOUNT)).join(` `),
  fullText: shuffle(SENTENCES).slice(0, SENTENCES.length - 1).join(` `),
  createdDate: getRandomDate(
      new Date(new Date().getFullYear(), new Date().getMonth() - MAX_MONTHS_PERIOD, 1), new Date(),
  ),
  сategory: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
}));

module.exports = {
  name: `--generate`,
  /**
   * @param {string[] | [any]} [args]
   */
  async run(args) {
    const [amount] = args;
    const amountAd = Number.parseInt(amount, 10) || DEFAULT_AMOUNT;
    const content = JSON.stringify(generateAds(amountAd));

    if (amount < MAX_ADS_AMOUNT) {
      try {
        await fs.writeFile(FILE_NAME, content);
        console.log(chalk.green(`Operation success. File created.`));
      } catch (e) {
        console.error(chalk.red(`Can't write data to file...`));
        process.exit(ExitCode.ERROR);
      }
    }
  },
};
