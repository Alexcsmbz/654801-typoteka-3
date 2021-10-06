'use strict';
const {Aliase} = require(`./constants`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineUser = require(`./user`);

const defineArticleCategory = (s) => s.define(`ArticleCategory`, {});

module.exports = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const User = defineUser(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});

  return {Category, Comment, Article, User, ArticleCategory};
};
