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
  db.any('SELECT * FROM Products LEFT JOIN Color ON Color.product_id = Products.product_color GROUP BY Products.product_id, Products.product_name, Products.product_category, Products.product_descriptions, Products.product_key_bullets, Products.product_price, Products.product_size, Products.product_color, Products.product_img_thumbnail, Products.product_img_full, Color.id, Color.name, color.quantity;')
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