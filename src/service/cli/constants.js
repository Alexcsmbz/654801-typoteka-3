'use strict';

const DEFAULT_AMOUNT = 1;
const MAX_ARTICLES_AMOUNT = 1000;
const MAX_MONTHS_PERIOD = 3;
const MOCK_FILENAME = `mocks.json`;
const MAX_ANNOUNCE_SENTENCES_AMOUNT = 5;
const ID_LENGTH = 6;
const API_PREFIX = `/api`;
const DEFAULT_PORT = 3000;
const mockFilePaths = [`./data/sentences.txt`, `./data/titles.txt`, `./data/categories.txt`, `./data/comments.txt`];


module.exports = {
  MAX_ARTICLES_AMOUNT,
  DEFAULT_AMOUNT,
  MOCK_FILENAME,
  MAX_ANNOUNCE_SENTENCES_AMOUNT,
  MAX_MONTHS_PERIOD,
  mockFilePaths,
  DEFAULT_PORT,
  ID_LENGTH,
  API_PREFIX,
};
