"use strict";

const {Aliase} = require(`../models/constants`);

class ArticlesService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async create(data) {
    const article = await this._Article.create(data);
    await article.addCategories(article.categories);
    return article.get();
  }

  async drop(id) {
    const deletedRows = await this._Article.destroy({where: {id}});
    return !!deletedRows;
  }

  async findOne(id) {
    return await this._Article.findByPk(id, {
      include: [Aliase.CATEGORIES],
    });
  }

  async findAll(withComments) {
    const include = [Aliase.CATEGORIES];

    if (withComments) {
      include.push(Aliase.COMMENTS);
    }

    const articles = await this._Article.findAll({
      include,
      order: [[`createdAt`, `DESC`]],
    });
    return articles.map((a) => a.get());
  }

  async update(id, article) {
    const [affectedRows] = await this._Article.update(article, {where: {id}});
    return !!affectedRows;
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [Aliase.CATEGORIES],
      order: [[`createdAt`, `DESC`]],
      distinct: true,
    });
    return {count, articles: rows};
  }
}

module.exports = ArticlesService;
