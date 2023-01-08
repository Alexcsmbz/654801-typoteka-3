"use strict";

const articles = require(`./articles`);
const category = require(`./categories`);
const search = require(`./search`);
const {
  ArticlesService,
  CategoriesService,
  SearchService,
  CommentsService,
} = require(`../data-service`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

defineModels(sequelize);

module.exports = async (routes) => {
  articles(
    routes,
    new ArticlesService(sequelize),
    new CommentsService(sequelize)
  );
  category(routes, new CategoriesService(sequelize));
  search(routes, new SearchService(sequelize));

  return routes;
};
