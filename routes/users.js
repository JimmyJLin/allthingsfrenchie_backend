const express = require('express');
const firebase = require('firebase');

const users = express.Router();


/* api routes */
users.route('/login')
  .get((req, res) => {
    res.render('auth/login');
  })
  .post((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        res.redirect('/cms/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const message = errorCode + ': ' + errorMessage
        console.log(errorCode + ': ' + errorMessage);
        req.flash('errors', errorMessage)
        console.log("errors message ----", req.flash('errors'))

        res.redirect('/users/login');
      });
  });

users.route('/signup')
  .get((req, res) => {
    res.render('auth/signup');
  })
  .post((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        res.redirect('/users/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ': ' + errorMessage);
      });
  });

users.route('/logout')
  .get((req, res, next) => {
    firebase.auth().signOut()
      .then(() => {
        res.redirect('/');
      }, (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ': ' + errorMessage);
      });
  });

module.exports = users;
