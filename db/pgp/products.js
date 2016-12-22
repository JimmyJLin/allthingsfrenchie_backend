const pgp  = require( 'pg-promise' )();

if (process.env.ENVIRONMENT === 'production') {
  var cn = process.env.DATABASE_URL
} else {
  var cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
}

const db = pgp(cn);

// show all products
function showAllProducts(req, res, next) {
  db.any('SELECT helper.product_id, helper.product_name, helper.product_category, helper.product_descriptions, helper.product_key_bullets, helper.product_price, helper.product_size, helper.product_color, helper.product_img_thumbnail, helper.product_img_full, helper.color_name, helper.color_quantity, Size.size_id, Size.xxsmall, Size.xsmall, Size.small, Size.medium, Size.large, Size.xlarge, Size.xxlarge FROM (SELECT Products.product_id, Products.product_name, Products.product_category, Products.product_descriptions, Products.product_key_bullets, Products.product_price, Products.product_size, Products.product_color, Products.product_img_thumbnail, Products.product_img_full, array_agg(Color.color_name) as color_name, array_agg(Color.color_quantity) as color_quantity FROM Products LEFT JOIN Color ON Products.product_color = Color.product_id GROUP BY Products.product_id) as helper LEFT JOIN Size ON helper.product_size = Size.product_id GROUP BY helper.product_id, helper.product_name, helper.product_category, helper.product_descriptions, helper.product_key_bullets, helper.product_price, helper.product_size, helper.product_color, helper.product_img_thumbnail, helper.product_img_full, helper.color_name, helper.color_quantity, Size.size_id, Size.xxsmall, Size.xsmall, Size.small, Size.medium, Size.large, Size.xlarge, Size.xxlarge;')
    .then((data) => {
      res.rows = data;
      console.log('data of all products: ', data);
      next();
    })
    .catch((error) => {
      console.log('error showing all products: ', error);
    });
}

module.exports.showAllProducts = showAllProducts;
