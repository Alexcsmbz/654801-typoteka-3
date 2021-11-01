
'use strict';

const express = require(`express`);
const request = require(`supertest`);
const category = require(`./categories`);
const {CategoriesService} = require(`../data-service`);
const {HttpCode} = require(`../../constants`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
// @ts-ignore
const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

const articles = [
  {
    title: `Как достигнуть успеха не вставая с кресла`,
    img: `ddd`,
    announce: `Вы можете достичь всего.`,
    fullText: `Альбом стал настоящим открытием года.`,
    categories: [
      `Вкусно`,
      `IT`,
      `Кино`,
      `Программирование`,
      `Деревья`,
      `Без рамки`,
    ],
    comments: [
      {
        text: `Плюсую, но слишком много букв!`,
      },
      {
        text: `Согласен с автором!`,
      },
      {
        text: `Это где ж такие красоты?`,
      },
      {
        text: `Согласен с автором!`,
      },
      {
        text: `Планируете записать видосик на эту тему?`,
      },
    ],
  },
  {
    title: `Обзор новейшего смартфона`,
    img: `asd`,
    announce: `Он написал больше 30 хитов.`,
    fullText: `Как начать действовать?`,
    categories: [
      `Домино`,
      `Программирование`,
      `Железо`,
      `Без рамки`,
      `Разное`,
      `Гастроном`,
      `IT`,
      `За жизнь`,
    ],
    comments: [
      {
        text: `Планируете записать видосик на эту тему?`,
      },
      {
        text: `Давно не пользуюсь стационарными компьютерами.`,
      },
    ],
  },
  {
    title: `Рок — это протест`,
    img: `dsadf`,
    announce: `Человеческие языки позволяют комбинировать слова великим множеством способов`,
    fullText: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    categories: [
      `IT`,
      `Деревья`,
      `За жизнь`,
      `Вкусно`,
    ],
    comments: [],
  },
  {
    title: `Что такое золотое сечение`,
    img: `ffff`,
    announce: `Как начать действовать? Для начала просто соберитесь.`,
    fullText: `Этот смартфон — настоящая находка.`,
    categories: [
      `Гастроном`,
      `Без рамки`,
      `Кино`,
      `Разное`,
      `Деревья`,
      `За жизнь`,
      `IT`,
      `Вкусно`,
    ],
    comments: [],
  },
  {
    title: `Ёлки. История деревьев`,
    img: `123ddd`,
    announce: `Этот смартфон — настоящая находка.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами.`,
    categories: [
      `IT`,
      `Деревья`,
      `Вкусно`,
      `Кино`,
    ],
    comments: [],
  },
];

const categories = [
  `Животные`,
  `Журналы`,
  `Игры`,
];

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    const sec = await initDB(mockDB, {categories, articles});
    const service = new CategoriesService(sec);
    category(app, service);
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.status).toBe(HttpCode.OK));
  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));
  test(`Category names are in list`, () => expect(response.body.map((it) => it.name)).toEqual(
      expect.arrayContaining([`Журналы`, `Игры`, `Животные`]),
  ),
  );
});
