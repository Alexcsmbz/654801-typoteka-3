'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const multer = require(`multer`);
const storage = require(`../multer-storage`);
// @ts-ignore
const router = new Router();

const upload = multer({storage});

const api = getAPI();

router.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));
router.get(`/add`, (_, res) => res.render(`new-post`));
router.post(`/add`,
    upload.single(`upload`),
    async (req, res) => {
      console.log(req);
      // const article = {
      //   title: body.title,
      //   announce: body.announce,
      //   fullText: body.fullText,
      //   category: Array.isArray(body.category) ? body.category : [body.category],
      //   img: {
      //     src: file.filename,
      //   },
      // };
      // try {
      //   await api.createArticle(article);
      //   res.redirect(`/my`);
      // } catch (err) {
      //   res.render(`new-post`, {article, categories: []});
      // }
    });
router.get(`/edit/:id`, async (req, res) => res.render(`edit-post`, {
  article: await api.getArticleById(req.params.id),
  categories: await api.getCategories(),
  comments: await api.getCommentsById(req.params.id),
}));
router.get(`/:id`, (_, res) => res.render(`post`));

module.exports = {articlesRouter: router};
