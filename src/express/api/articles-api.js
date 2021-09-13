'use strict';

const {defaultUrl, TIMEOUT} = require(`../constants`);
const API = require(`./api`);

class ArticlesAPI extends API {
  constructor(baseURL, timeout) {
    super(baseURL, timeout);
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticleById(id) {
    return this._load(`/articles/${id}`);
  }

  getCategories() {
    return this._load(`/categories`);
  }

  getComments() {
    return this._load(`/articles/jwwQoG/comments`);
  }

  getCommentsById(id) {
    return this._load(`/articles/${id}/comments`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  async createArticle(data) {
    return this._load(`/articles/add`, {
      method: `POST`,
      data,
    });
  }
}

module.exports = new ArticlesAPI(defaultUrl, TIMEOUT);
