const express = require('express');

const main = express.Router();

let authUser = false;

/* api routes */
main.route('/')
  .get((req, res) => {
    res.render('pages/index', { authUser });
  });

module.exports = main;
