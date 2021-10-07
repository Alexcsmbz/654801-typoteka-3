'use strict';

const {Router} = require(`express`);
const {articlesApi} = require(`../api`);
const {upload} = require(`../middlewares`);
// @ts-ignore
const router = new Router();

router.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));
router.get(`/add`, (_, res) => res.render(`new-post`));
router.post(
    `/add`,
    upload.single(`upload`),
    async ({body, file}, res) => {
      const article = {
        title: body.title,
        announce: body.announce,
        fullText: body.fullText,
        category: Array.isArray(body.category) ? body.category : [body.category],
        img: {
          src: file ? file.filename : ``,
        },
      };
      try {
        await articlesApi.createArticle(article);
        res.redirect(`/my`);
      } catch (err) {
        res.render(`new-post`, {article, categories: []});
      }
    },
);
router.get(`/edit/:id`, async (req, res) => {
  const [article, categories, comments] = await Promise.all([
    articlesApi.getArticleById(req.params.id),
    articlesApi.getCategories(),
    articlesApi.getCommentsById(req.params.id),
  ]);

  return res.render(`edit-post`, {article, categories, comments});
});
router.get(`/:id`, async (req, res) => {
  res.render(`post`, {article: await articlesApi.getArticleById(req.params.id, true)});
});

module.exports = {articlesRouter: router};
