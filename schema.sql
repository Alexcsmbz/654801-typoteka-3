CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL
);
CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar varchar(50)
);
CREATE TABLE articles(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(250) NOT NULL,
  created_date timestamp NOT NULL,
  full_text text NOT NULL,
  announce text NOT NULL,
  img varchar(50),
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  created_date timestamp NOT NULL,
  user_id integer NOT NULL,
  article_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);
CREATE TABLE articles_categories(
  article_id integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON articles (title);
