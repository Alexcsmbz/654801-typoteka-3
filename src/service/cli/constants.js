'use strict';

const DEFAULT_AMOUNT = 1;
const MAX_ADS_AMOUNT = 1000;
const MAX_MONTHS_PERIOD = 3;
const FILE_NAME = `mocks.json`;
const MAX_ANNOUNCE_SENTENCES_AMOUNT = 5;
const mockFilePaths = [`./data/sentences.txt`, `./data/titles.txt`, `./data/categories.txt`];

module.exports = {
  MAX_ADS_AMOUNT,
  DEFAULT_AMOUNT,
  FILE_NAME,
  MAX_ANNOUNCE_SENTENCES_AMOUNT,
  MAX_MONTHS_PERIOD,
  mockFilePaths,
};
