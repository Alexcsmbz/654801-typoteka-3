"use strict";

const {Router} = require(`express`);
const {prepareErrors, ensureArray} = require("../utils");
const {articlesApi} = require(`../api`);
const {upload} = require(`../middlewares`);
const chalk = require("chalk");
// @ts-ignore
const router = new Router();

const getEditArticleData = async (id) =>
  await Promise.all([
    articlesApi.getArticleById(id),
    articlesApi.getCategories(),
  ]);

router.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));

router.get(`/add`, (_, res) => res.render(`new-post`));

router.post(`/add`, upload.single(`upload`), async ({body, file}, res) => {
  const article = {
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    category: Array.isArray(body.category) ? body.category : [body.category],
    img: file ? file.filename : ``,
  };

  try {
    await articlesApi.createArticle(article);
    res.redirect(`/my`);
  } catch (err) {
    const validationMessages = prepareErrors(err);
    const categories = await articlesApi.getCategories();
    res.render(`new-post`, {categories, validationMessages});
  }
});

router.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await getEditArticleData(id);

  res.render(`edit-post`, {id, article, categories});
});

router.get(`/:id`, async (req, res) => {
  const article = await articlesApi.getArticleById(req.params.id, true);
  res.render(`post`, {
    article,
    id: req.params.id,
  });
});

router.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {id} = req.params;
  const article = {
    title: body.title,
    announce: body.announce,
    fullText: body.fullText,
    categories: ensureArray(body.category),
    img: file ? file.filename : body[`old-image`],
  };

  try {
    await articlesApi.editArticle(id, article);
    res.redirect(`/my`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const [article, categories] = await getEditArticleData(id);

    res.render(`edit-post`, {
      id,
      article,
      categories,
      validationMessages,
    });
  }
});

router.post(`/:id/comments`, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;

  try {
    await articlesApi.createComment(id, {text: comment});
    res.redirect(`/articles/${id}`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const article = await articlesApi.getArticleById(id, true);
    res.render(`post`, {article, id, validationMessages});
  }
});

module.exports = {articlesRouter: router};
