'use strict';

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const TIMEOUT = 1000;
const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

module.exports = {
  DEFAULT_PORT,
  PUBLIC_DIR,
  TIMEOUT,
  defaultUrl,
};
