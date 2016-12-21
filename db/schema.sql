DROP TABLE if EXISTS Products CASCADE;
DROP TABLE if EXISTS Size CASCADE;
DROP TABLE if EXISTS Color CASCADE;


CREATE TABLE Products (
  product_id SERIAL PRIMARY KEY UNIQUE,
  product_name VARCHAR(500),
  product_category VARCHAR(200),
  product_descriptions VARCHAR(2000),
  product_key_bullets text[],
  product_price VARCHAR(50),
  product_size INTEGER,
  product_color INTEGER,
  product_img_thumbnail VARCHAR(2000),
  product_img_full text[],
  saved_data TIMESTAMP
);

CREATE TABLE Size (
  size_id SERIAL PRIMARY KEY UNIQUE,
  product_id INTEGER REFERENCES Products (product_id) ON DELETE CASCADE,
  xxsmall NUMERIC,
  xsmall NUMERIC,
  small NUMERIC,
  medium NUMERIC,
  large NUMERIC,
  xlarge NUMERIC,
  xxlarge NUMERIC
);

CREATE TABLE Color (
  color_id SERIAL PRIMARY KEY UNIQUE,
  product_id INTEGER REFERENCES Products (product_id) ON DELETE CASCADE,
  color_name VARCHAR(200),
  color_quantity NUMERIC
);
