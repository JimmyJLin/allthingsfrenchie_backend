const express = require('express');
const firebase = require('firebase');

const cms = express.Router();


/* api routes */
cms.route('/')
  .get((req, res) => {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user.emailVerified) {
          res.render('cms/cms');
          console.log('Email is verified');
        } else {
          console.log('Email is not verified');
          res.redirect('/users/verify-email');
        }
      });
    } else {
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
