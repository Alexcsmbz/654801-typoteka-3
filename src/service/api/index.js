'use strict';

const {getDataFromCache} = require(`../cli/utils`);
const {MOCK_FILENAME} = require(`../cli/constants`);
const articles = require(`./articles`);
const category = require(`./categories`);
const search = require(`./search`);
const {
  ArticlesService,
  CategoriesService,
  SearchService,
} = require(`../data-service`);

module.exports = async (routes) => {
  const data = JSON.parse(await getDataFromCache()(MOCK_FILENAME));

  articles(routes, new ArticlesService(data));
  category(routes, new CategoriesService(data));
  search(routes, new SearchService(data));

  return routes;
};
