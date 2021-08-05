'use strict';

const fs = require(`fs`);
const {generateAds} = require(`./utils`);
const {DEFAULT_AMOUNT, FILE_NAME, MAX_ADS_AMOUNT} = require(`./constants`);
const {ExitCode} = require(`../../constants`);

module.exports = {
  name: `--generate`,
  run(args) {
    const [amount] = args;
    const amountAd = Number.parseInt(amount, 10) || DEFAULT_AMOUNT;
    const content = JSON.stringify(generateAds(amountAd));

    if (amount < MAX_ADS_AMOUNT) {
      fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
          return console.error(`Can't write data to file... Code ${ExitCode.error}`);
        }

        return console.info(`Operation success. File created. Code ${ExitCode.success}`);
      });
    } else {
      console.error(`Amount should be less ${MAX_ADS_AMOUNT}. Try again`);
    }
  }
};
