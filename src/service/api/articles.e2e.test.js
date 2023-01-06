"use strict";

const express = require(`express`);
const articles = require(`./articles`);
const {ArticlesService} = require(`../data-service`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);

const mockArticles = [
  {
    title: `Как достигнуть успеха не вставая с кресла`,
    announce: `Вы можете достичь всего.`,
    fullText: `Альбом стал настоящим открытием года.`,
    img: ``,
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
    announce: `Он написал больше 30 хитов.`,
    fullText: `Как начать действовать?`,
    img: ``,
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
    announce: `Человеческие языки позволяют комбинировать слова великим множеством способов`,
    fullText: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    img: ``,
    categories: [`IT`, `Деревья`, `За жизнь`, `Вкусно`],
    comments: [],
  },
  {
    title: `Что такое золотое сечение`,
    announce: `Как начать действовать? Для начала просто соберитесь.`,
    fullText: `Этот смартфон — настоящая находка.`,
    img: ``,
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
    announce: `Этот смартфон — настоящая находка.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами.`,
    img: ``,
    categories: [`IT`, `Деревья`, `Вкусно`, `Кино`],
    comments: [],
  },
];

const mockCategories = [`Животные`, `Журналы`, `Игры`];

const createAPI = async () => {
  const app = express();
  app.use(express.json());
  // @ts-ignore
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  const sec = await initDB(mockDB, {
    categories: mockCategories,
    articles: mockArticles,
  });
  const service = new ArticlesService(sec);
  articles(app, service);
  return app;
};

describe(`API returns a list of all articles`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 articles`, () =>
    expect(response.body.length).toBe(5));
  test(`First article id equals "8MfXha"`, () =>
    expect(response.body[0].id).toBe(`8MfXha`));
});

describe(`API returns an article with given id`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/8MfXha`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Offer's title is "Как достигнуть успеха не вставая с кресла"`, () =>
    expect(response.body.title).toBe(
      `Как достигнуть успеха не вставая с кресла`
    ));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `Самый лучший музыкальный альбом этого года`,
    announce: `Достичь успеха помогут ежедневные повторения.`,
    fullText: `Освоить вёрстку несложно.`,
    category: [
      `Деревья`,
      `IT`,
      `Программирование`,
      `Домино`,
      `Железо`,
      `Кино`,
      `Гастроном`,
      `Без рамки`,
      `Вкусно`,
      `За жизнь`,
    ],
  };
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns acticle created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Articles count is changed`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    title: `Самый лучший музыкальный альбом этого года`,
    announce: `Достичь успеха помогут ежедневные повторения.`,
    fullText: `Освоить вёрстку несложно.`,
    category: [
      `Деревья`,
      `IT`,
      `Программирование`,
      `Домино`,
      `Железо`,
      `Кино`,
      `Гастроном`,
      `Без рамки`,
      `Вкусно`,
      `За жизнь`,
    ],
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];

      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const validArticle = {
    title: `Самый лучший музыкальный альбом этого года`,
    announce: `Достичь успеха помогут ежедневные повторения.`,
    fullText: `Освоить вёрстку несложно.`,
    category: [
      `Деревья`,
      `IT`,
      `Программирование`,
      `Домино`,
      `Железо`,
      `Кино`,
      `Гастроном`,
      `Без рамки`,
      `Вкусно`,
      `За жизнь`,
    ],
  };
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/articles/8MfXha`).send(validArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () =>
    expect(response.body).toEqual(expect.objectContaining(validArticle)));
  test(`Article is really changed`, () =>
    request(app)
      .get(`/articles/8MfXha`)
      .expect((res) =>
        expect(res.body.title).toBe(
          `Самый лучший музыкальный альбом этого года`
        )
      ));
});

describe(`API returns correctly bad codes`, () => {
  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`API returns status code 404 when trying to change non-existent article`, () => {
    const validArticle = {
      title: `Самый лучший музыкальный альбом этого года`,
      announce: `Достичь успеха помогут ежедневные повторения.`,
      fullText: `Освоить вёрстку несложно.`,
      category: [
        `Деревья`,
        `IT`,
        `Программирование`,
        `Домино`,
        `Железо`,
        `Кино`,
        `Гастроном`,
        `Без рамки`,
        `Вкусно`,
        `За жизнь`,
      ],
    };

    return request(app)
      .put(`/articles/_`)
      .send(validArticle)
      .expect(HttpCode.NOT_FOUND);
  });

  test(`API returns status 400 when trying to change an article with invalid data`, () => {
    const invalidArticle = {
      title: `Самый лучший музыкальный альбом этого года`,
      announce: `Достичь успеха помогут ежедневные повторения.`,
      fullText: `Освоить вёрстку несложно.`,
    };

    return request(app)
      .put(`/articles/8MfXha`)
      .send(invalidArticle)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`API correcty deletes an article & API refuses to delete non-existent article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/RMW8IT`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () =>
    expect(response.body.id).toBe(`RMW8IT`));
  test(`API refuses to delete non-existent article`, () =>
    request(app).delete(`/articles/_`).expect(HttpCode.NOT_FOUND));
});

describe(`API creates a comment if data is valid`, () => {
  const comment = {text: `comment`};

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/8MfXha/comments`)
      .send(comment);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns comment created`, () =>
    expect(response.body).toEqual(expect.objectContaining(comment)));
  test(`Comments count is changed`, () =>
    request(app)
      .get(`/articles/8MfXha/comments`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

describe(`API refuses to create a comment if data is invalid`, () => {
  const comment = {text: `comment`};

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(comment)) {
      const badArticle = {...comment};
      delete badArticle[key];

      await request(app)
        .post(`/articles/8MfXha/comments/`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API correcty deletes a comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/8MfXha/comments/wuadOQ`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () =>
    expect(response.body.id).toBe(`wuadOQ`));
  test(`API refuses to delete non-existent comment`, () =>
    request(app)
      .delete(`/articles/8MfXha/comments/_`)
      .expect(HttpCode.NOT_FOUND));
});
