"use strict";

const express = require(`express`);
const {routesPaths, DEFAULT_PORT} = require(`./constants`);

const {articlesRouter} = require(`../router/articles`);
const {categoriesRouter} = require(`../router/categories`);
const {myRouter} = require(`../router/my`);

const app = express();

app.use(routesPaths.my, myRouter);
app.use(routesPaths.articles, articlesRouter);
app.use(routesPaths.categories, categoriesRouter);

app.get(routesPaths.main, (_, res) => res.send(routesPaths.main));
app.get(routesPaths.register, (_, res) => res.send(routesPaths.register));
app.get(routesPaths.login, (_, res) => res.send(routesPaths.login));
app.get(routesPaths.search, (_, res) => res.send(routesPaths.search));

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
