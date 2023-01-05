"use strict";

const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const {SearchService} = require(`../data-service`);
const {HttpCode} = require(`../../constants`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
// @ts-ignore
const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

const categories = [`Железо`, `Без рамки`, `Деревья`];

const articles = [
  {
    title: `Борьба с прокрастинацией`,
    announce: `Простые ежедневные упражнения помогут достичь успеха. 
      Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    fullText: `Этот смартфон — настояща всего. Стоит только немного постараться и запастись книгами. 
      Как начать действовать? Для начала просто соберитесь.`,
    categories: [`Железо`, `Без рамки`, `Деревья`],
    img: ``,
    comments: [
      {
        text: `Это где ж такие красоты?`,
      },
      {
        text: `Совсем немного...`,
      },
      {
        text: `Согласен с автором!`,
      },
    ],
  },
];

describe(`API returns articles based on search query`, () => {
  let response;

  beforeAll(async () => {
    const sec = await initDB(mockDB, {categories, articles});
    const service = new SearchService(sec);
    search(app, service);
    response = await request(app).get(`/search`).query({query: `Борьба`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 articles found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct title`, () =>
    expect(response.body[0].title).toBe(`Борьба с прокрастинацией`));
});

test(`API returns 400 when query string is absent`, () =>
  request(app).get(`/search`).expect(HttpCode.BAD_REQUEST));
