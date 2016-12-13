const express = require('express');

const users = express.Router();


/* api routes */
users.route('/login')
  .get((req, res) => {
    res.render('auth/login');
  })


module.exports = users;
