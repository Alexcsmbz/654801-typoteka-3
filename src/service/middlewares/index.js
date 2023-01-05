"use strict";

const articleExist = require(`./article-exist`);
const articleCommentExist = require(`./article-comment-exist`);
const keysValidator = require(`./keys-validator`);
const clientError = require(`./client-error`);
const serverError = require(`./server-error`);
const requestInfo = require(`./request-info`);

module.exports = {
  articleExist,
  articleCommentExist,
  keysValidator,
  clientError,
  serverError,
  requestInfo,
};
