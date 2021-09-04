'use strict';

const {Router} = require(`express`);
const {getAds} = require(`../cli/utils`);
const {MOCK_FILENAME} = require(`../cli/constants`);
const articles = require(`./articles`);
const category = require(`./categories`);
const search = require(`./search`);

const {
  ArticlesService,
  CategoriesService,
  SearchService,
} = require(`../data-service`);


// @ts-ignore
const app = new Router();

(async () => {
  const mockData = await getAds(MOCK_FILENAME);

  articles(app, new ArticlesService(mockData));
  category(app, new CategoriesService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
