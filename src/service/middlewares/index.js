'use strict';

const articleExist = require(`./article-exist`);
const articleCommentExist = require(`./article-comment-exist`);
const keysValidator = require(`./keys-validator`);

module.exports = {
  articleExist,
  articleCommentExist,
  keysValidator,
};
