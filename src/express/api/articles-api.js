"use strict";

const {HttpMethod} = require("../../constants");
const {defaultUrl, TIMEOUT} = require(`../constants`);
const API = require(`./api`);

class ArticlesAPI extends API {
  constructor(baseURL, timeout) {
    super(baseURL, timeout);
  }

  getArticles({offset = undefined, limit = undefined, comments}) {
    return this._request(`/articles`, {params: {comments, offset, limit}});
  }

  getArticleById(id, comments) {
    return this._request(`/articles/${id}`, {params: {comments}});
  }

  getCategories(count) {
    return this._request(`/categories`, {params: {count}});
  }

  getComments() {
    return this._request(`/articles/jwwQoG/comments`);
  }

  getCommentsById(id) {
    return this._request(`/articles/${id}/comments`);
  }

  search(query) {
    return this._request(`/search`, {params: {query}});
  }

  createArticle(data) {
    return this._request(`/articles/add`, {
      method: `POST`,
      data,
    });
  }

  editArticle(id, data) {
    return this._request(`/articles/${id}`, {
      method: HttpMethod.PUT,
      data,
    });
  }

  createComment(id, data) {
    return this._request(`/articles/${id}/comments`, {
      method: HttpMethod.POST,
      data,
    });
  }
}

module.exports = new ArticlesAPI(defaultUrl, TIMEOUT);
