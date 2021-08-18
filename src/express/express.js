"use strict";

const express = require(`express`);
const {DEFAULT_PORT} = require(`./constants`);
const {router} = require(`../router`);

const app = express();

app.use(router);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
