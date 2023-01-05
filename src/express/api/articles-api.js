"use strict";

const {defaultUrl, TIMEOUT} = require(`../constants`);
const API = require(`./api`);

class ArticlesAPI extends API {
  constructor(baseURL, timeout) {
    super(baseURL, timeout);
  }

  getArticles({comments}) {
    return this._load(`/articles`, {params: {comments}});
  }

  getArticleById(id, comments) {
    return this._load(`/articles/${id}`, {params: {comments}});
  }

  getCategories(count) {
    return this._load(`/categories`, {params: {count}});
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
