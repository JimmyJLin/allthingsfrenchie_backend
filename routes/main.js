const express = require('express');

const main = express.Router();

let authUser = false;
let userData;

/* api routes */
main.route('/')
  .get((req, res) => {
    res.render('pages/index', { authUser, userData });
  });

module.exports = main;
