'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {upload} = require(`../middlewares`);
// @ts-ignore
const router = new Router();

const api = getAPI();

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
        await api.createArticle(article);
        res.redirect(`/my`);
      } catch (err) {
        res.render(`new-post`, {article, categories: []});
      }
    },
);
router.get(`/edit/:id`, async (req, res) => res.render(`edit-post`, {
  article: await api.getArticleById(req.params.id),
  categories: await api.getCategories(),
  comments: await api.getCommentsById(req.params.id),
}));
router.get(`/:id`, (_, res) => res.render(`post`));

module.exports = {articlesRouter: router};
