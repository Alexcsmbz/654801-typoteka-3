"use strict";

const DEFAULT_PORT = 8080;

const routesPaths = {
  main: `/`,
  register: `/register`,
  login: `/login`,
  search: `/search`,
  my: `/my`,
  articles: `/articles`,
  categories: `/categories`,
};

module.exports = {
  DEFAULT_PORT,
  routesPaths,
};
