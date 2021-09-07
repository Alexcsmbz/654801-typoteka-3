
'use strict';

const express = require(`express`);

const request = require(`supertest`);
const category = require(`./categories`);
const {CategoriesService} = require(`../data-service`);
const {HttpCode} = require(`../../constants`);

const data = [
  {
    id: `8MfXha`,
    title: `Как достигнуть успеха не вставая с кресла`,
    createdDate: `2021-06-11 20:14:23`,
    announce: `Вы можете достичь всего.`,
    fullText: `Альбом стал настоящим открытием года.`,
    category: [
      `Вкусно`,
      `IT`,
      `Кино`,
      `Программирование`,
      `Деревья`,
      `Без рамки`,
    ],
    comments: [
      {
        id: `wuadOQ`,
        text: `Плюсую, но слишком много букв!`,
      },
      {
        id: `J7brJK`,
        text: `Согласен с автором!`,
      },
      {
        id: `rYyjEi`,
        text: `Это где ж такие красоты?`,
      },
      {
        id: `eM9F0A`,
        text: `Согласен с автором!`,
      },
      {
        id: `CvlSKo`,
        text: `Планируете записать видосик на эту тему?`,
      },
    ],
  },
  {
    id: `RMW8IT`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2021-06-11 20:14:23`,
    announce: `Он написал больше 30 хитов.`,
    fullText: `Как начать действовать?`,
    category: [
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
        id: `_DrN3I`,
        text: `Планируете записать видосик на эту тему?`,
      },
      {
        id: `VW_DBv`,
        text: `Давно не пользуюсь стационарными компьютерами.`,
      },
    ],
  },
  {
    id: `D6aDq9`,
    title: `Рок — это протест`,
    createdDate: `2021-06-11 20:14:23`,
    announce: `Человеческие языки позволяют комбинировать слова великим множеством способов`,
    fullText: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    category: [
      `IT`,
      `Деревья`,
      `За жизнь`,
      `Вкусно`,
    ],
    comments: [],
  },
  {
    id: `6gRO82`,
    title: `Что такое золотое сечение`,
    createdDate: `2021-06-11 20:14:23`,
    announce: `Как начать действовать? Для начала просто соберитесь.`,
    fullText: `Этот смартфон — настоящая находка.`,
    category: [
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
    id: `G-8V3b`,
    title: `Ёлки. История деревьев`,
    createdDate: `2021-06-11 20:14:23`,
    announce: `Этот смартфон — настоящая находка.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами.`,
    category: [
      `IT`,
      `Деревья`,
      `Вкусно`,
      `Кино`,
    ],
    comments: [],
  },
];

const app = express();
app.use(express.json());

category(app, new CategoriesService(data));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.status).toBe(HttpCode.OK));
  test(`Returns list of 11 categories`, () => expect(response.body.length).toBe(11));
  test(`Category names are in list`, () => {
    expect.arrayContaining([
      `Деревья`,
      `За жизнь`,
      `Без рамки`,
      `Разное`,
      `IT`,
      `Музыка`,
      `Кино`,
      `Программирование`,
      `Железо`,
      `Домино`,
      `Гастроном`,
      `Вкусно`,
    ]);
  });
});
