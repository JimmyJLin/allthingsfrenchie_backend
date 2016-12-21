-- following return join table of products with Colors NOT with Size
SELECT name, category, descriptions, key_bullets, price, size, color, img_thumbnail, img_full FROM Products INNER JOIN Size ON (Products.size = Size.product_id);

-- following return join table of products with Size but NOT the detail for the size
SELECT name, category, descriptions, key_bullets, price, size, color, img_thumbnail, img_full FROM Products RIGHT JOIN Size ON (Products.id = Size.product_id);

SELECT helper.id, helper.name, helper.category, helper.category, helper.descriptions, helper.key_bullets, helper.price, helper.size, helper.color, helper.img_thumbnail, helper.img_full
FROM (SELECT *
FROM Products
INNER JOIN Size
ON Products.size = Size.product_id
) as helper
RIGHT JOIN Color on Color.product_id = helper.id;

-- return all joint table between products and size
SELECT *
FROM Products
INNER JOIN Size
ON Products.size = Size.product_id


SELECT *
FROM Products
INNER JOIN Color ON Color.product_id = Products.size

SELECT *
FROM Products
LEFT JOIN Color ON Color.product_id = Products.color
GROUP BY Products.id, Products.name, Products.category, Products.descriptions, Products.key_bullets, Products.price, Products.size, Products.color, Products.img_thumbnail, Products.img_full, Color.id, Color.name, color.quantity;

SELECT * FROM Products LEFT JOIN Color ON Color.product_id = Products.product_color GROUP BY Products.product_id, Products.product_name, Products.product_category, Products.product_descriptions, Products.product_key_bullets, Products.product_price, Products.product_size, Products.product_color, Products.product_img_thumbnail, Products.product_img_full, Color.id, Color.name, color.quantity;
