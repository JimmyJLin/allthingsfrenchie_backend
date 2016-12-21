const express = require('express');
const bodyParser = require('body-parser');
const db = require('./../db/pgp/products.js');

const products = express.Router();

products.route('/')
  .get(db.showAllProducts, (req, res) => {
    res.send(res.rows);
  });

  module.exports = products;
