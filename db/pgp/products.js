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
  db.any('select * from Products;')
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
