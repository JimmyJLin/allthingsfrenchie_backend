const express = require('express');

const cms = express.Router();


/* api routes */
cms.route('/')
  .get((req, res) => {
    res.render('cms/cms');
  });

cms.route('/add-products')
  .get((req, res) => {
    res.render('cms/add-products')
  });

cms.route('/add-category')
  .get((req, res) => {
    res.render('cms/add-category')
  });

cms.route('/inventory')
  .get((req, res) => {
    res.render('cms/inventory')
  });

module.exports = cms;
