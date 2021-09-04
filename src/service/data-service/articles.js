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
    const newArticle = Object.assign({id: nanoid(ID_LENGTH), comments: []}, article);
    this._articles.push(newArticle);
    return newArticle;
  }

  update(id, article) {
    const oldArticle = this._articles.find((item) => (item.id === id));

    return Object.assign(oldArticle || {id: nanoid(ID_LENGTH)}, article);
  }

  drop(article) {
    this._articles = this._articles.filter((item) => {
      return item.id !== article.id;
    });
    return article;
  }

  dropComment(article, comment) {
    article.comments = article.comments.filter((item) => (item.id !== comment.id));
  }

  createComment(article, comment) {
    const newComment = Object.assign({id: nanoid(ID_LENGTH)}, comment);

    article.comments.push(newComment);

    return newComment;
  }
}

module.exports = ArticlesService;
