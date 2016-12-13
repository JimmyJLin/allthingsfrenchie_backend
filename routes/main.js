const express = require('express');

const main = express.Router();


/* api routes */
main.route('/')
  .get((req, res) => {
    res.render('pages/index');
  });

module.exports = main;
