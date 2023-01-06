"use strict";

const DEFAULT_PORT = 8080;
const Dir = {
  PUBLIC: `public`,
  UPLOAD: `upload`,
};
const TIMEOUT = 1000;
const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;
const UPLOAD_IMAGES_DIR = `../upload/img/`;
const ITEMS_PER_PAGE = 8;

module.exports = {
  DEFAULT_PORT,
  Dir,
  TIMEOUT,
  defaultUrl,
  UPLOAD_IMAGES_DIR,
  ITEMS_PER_PAGE,
};
