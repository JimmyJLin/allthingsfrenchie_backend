const express = require('express');
const firebase = require('firebase');

const cms = express.Router();


/* api routes */
cms.route('/')
  .get((req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
      console.log('rendering cms page')
      res.render('cms/cms');
    } else {
      console.log('redirecting')
      res.redirect('/');
    }
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
