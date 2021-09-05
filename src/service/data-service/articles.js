'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../cli/constants`);

class ArticlesService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  create(article) {
    this._articles.push({...article, id: nanoid(ID_LENGTH), comments: []});
    return {...article, id: nanoid(ID_LENGTH), comments: []};
  }

  update(id, article) {
    return {...this._articles.find((item) => (item.id === id)), ...article};
  }

  drop(article) {
    this._articles = this._articles.filter((item) => item.id !== article.id);
    return article;
  }

  dropComment(article, comment) {
    article.comments = article.comments.filter((item) => (item.id !== comment.id));
  }

  createComment(article, comment) {
    article.comments.push({...comment, id: nanoid(ID_LENGTH)});
    return {...comment, id: nanoid(ID_LENGTH)};
  }
}

module.exports = ArticlesService;
