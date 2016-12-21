DROP TABLE if EXISTS Products CASCADE;


CREATE TABLE Products (
  id SERIAL PRIMARY KEY UNIQUE,
  name VARCHAR(500),
  category VARCHAR(200),
  descriptions VARCHAR(2000),
  key_bullets text[],
  price VARCHAR(50),
  size VARCHAR(2000),
  color VARCHAR(2000),
  img_thumbnail VARCHAR(2000),
  img_full text[],
  saved_data TIMESTAMP
);
