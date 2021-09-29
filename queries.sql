-- get all categories
SELECT * from categories;

-- get categories with 1 articles (and more)
SELECT id, name FROM categories
  JOIN articles_categories
  ON id = category_id
  GROUP BY id
  ORDER BY id;

-- get categories with articles amount
SELECT id, name, COUNT(article_id) FROM categories
  LEFT JOIN articles_categories
  ON id = articles_categories.category_id
  GROUP BY id
  ORDER BY id;

-- get articles
SELECT articles.id, articles.title, articles.announce, articles.created_date,
  users.first_name,
  users.last_name,
  users.email,
  COUNT(DISTINCT comments.id) AS comments_counts,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
  GROUP BY articles.id, articles.created_date, users.id
  ORDER BY articles.created_date DESC;

-- get article details
SELECT articles.id, articles.title, articles.announce, articles.full_text, articles.created_date, articles.img,
  users.first_name,
  users.last_name,
  users.email,
  COUNT(DISTINCT comments.id) AS comments_counts,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
WHERE articles.id = 1
  GROUP BY articles.id, users.id;

-- get last 5 articles
SELECT
  comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
  ORDER BY comments.created_date DESC
  LIMIT 5;

-- get comments from article
SELECT
  comments.id,
  comments.article_id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
WHERE comments.article_id = 1
  ORDER BY comments.created_date DESC;

-- update article title
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
