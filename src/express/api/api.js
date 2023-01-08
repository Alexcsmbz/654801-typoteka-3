"use strict";

const axios = require(`axios`);

class API {
  constructor(baseURL, timeout) {
    // @ts-ignore
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _request(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }
}

module.exports = API;
