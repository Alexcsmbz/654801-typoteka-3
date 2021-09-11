'use strict';

const axios = require(`axios`);
const {defaultUrl, TIMEOUT} = require(`./constants`);

class API {
  constructor(baseURL, timeout) {
    // @ts-ignore
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
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

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
