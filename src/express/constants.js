'use strict';

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
const TIMEOUT = 1000;
const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;
const UPLOAD_IMAGES_DIR = `../upload/img/`;

module.exports = {
  DEFAULT_PORT,
  PUBLIC_DIR,
  UPLOAD_DIR,
  TIMEOUT,
  defaultUrl,
  UPLOAD_IMAGES_DIR,
};
