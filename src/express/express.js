"use strict";

const express = require(`express`);
const path = require(`path`);
const {DEFAULT_PORT, PUBLIC_DIR} = require(`./constants`);
const {router} = require(`../router`);

const app = express();

app.use(router);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
