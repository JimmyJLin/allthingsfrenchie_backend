const express = require('express');
const firebase = require('firebase');

const users = express.Router();

let messages;

/* api routes */
users.route('/login')
  .get((req, res) => {
    res.render('auth/login', { messages });
    console.log('errorMessage', messages);
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
        const message = errorCode + ': ' + errorMessage;
        console.log('errors -----> ', message)
        // console.log("errors message ----", req.flash('errors'))
        messages = errorMessage;

        res.redirect('/users/login');
      });
  });

users.route('/signup')
  .get((req, res) => {
    res.render('auth/signup', { messages });
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
        messages = errorMessage;

        res.redirect('/users/signup');
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

users.route('/verify-email')
  .get((req, res) => {
    res.render('auth/verify-email');
  })
  .post((req, res, next) => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification()
      .then(() => {
        console.log('Email sent');
        res.redirect('/');
      }, (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ': ' + errorMessage);
      });
  });

module.exports = users;
