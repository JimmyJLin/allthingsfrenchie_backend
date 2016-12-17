const express = require('express');
const firebase = require('firebase');

const cms = express.Router();

let authUser;

/* api routes */
cms.route('/', { authUser })
  .get((req, res) => {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user.emailVerified) {
          authUser = true;
          res.render('cms/cms', { authUser });
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
    res.render('cms/add-products', { authUser })
  })
  .post((req, res, next) => {
    const productName = req.body.product_name;
    const category = req.body.category;
    const price = req.body.price;
    const size = {
      xsmall: req.body.size_xsmall,
      small: req.body.size_small,
      medium: req.body.size_medium,
      large: req.body.size_large,
      xlarge: req.body.size_xlarge
    };
    const descriptions = req.body.descriptions;
    const bullets = {
      bullet_one: req.body.point_one,
      bullet_two: req.body.point_two,
      bullet_three: req.body.point_three,
      bullet_four: req.body.point_four
    };
    const thumbnail = req.body.thumbnail;
    const imgLinks = {
      img_one: req.body.img_one,
      img_two: req.body.img_two,
      img_three: req.body.img_three,
      img_four: req.body.img_four
    };

    console.log('added products', productName, category, price, size, descriptions, bullets, thumbnail, imgLinks);
  });

cms.route('/add-category')
  .get((req, res) => {
    res.render('cms/add-category', { authUser })
  });

cms.route('/inventory')
  .get((req, res) => {
    res.render('cms/inventory', { authUser })
  });

module.exports = cms;
