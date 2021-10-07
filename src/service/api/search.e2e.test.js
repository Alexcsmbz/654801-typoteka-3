'use strict';

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

const articles = [
  {
    title: `Борьба с прокрастинацией`,
    announce: `Простые ежедневные упражнения помогут достичь успеха. 
      Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    fullText: `Этот смартфон — настояща всего. Стоит только немного постараться и запастись книгами. 
      Как начать действовать? Для начала просто соберитесь.`,
    createdDate: `2021-06-11 20:14:23`,
    сategory: [`Железо`, `Без рамки`, `Деревья`],
    id: `UESGQa`,
    comments: [
      {
        text: `Это где ж такие красоты?`,
        id: `pqqtwY`,
      },
      {
        text: `Совсем немного...`,
        id: `_9syOs`,
      },
      {
        text: `Согласен с автором!`,
        id: `wIzv7o`,
      },
    ],
  },
];

const categories = [
  `Животные`,
  `Журналы`,
  `Игры`,
];

describe(`API returns articles based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({query: `Борьба`});
    await initDB(mockDB, {categories, articles});
    search(app, new SearchService(articles));
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 articles found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct title`, () => expect(response.body[0].title).toBe(`Борьба с прокрастинацией`));
});

test(`API returns 400 when query string is absent`, () => request(app).get(`/search`).expect(HttpCode.BAD_REQUEST));
