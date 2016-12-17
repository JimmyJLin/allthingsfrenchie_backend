const express = require('express');
const firebase = require('firebase');

const users = express.Router();

let messages = [];
let authUser = false;

function message() {
  messages = setTimeout(resetMessage, 3000);
}

function resetMessage() {
  messages = [];
}

/* api routes */
users.route('/login')
  .get((req, res) => {
    res.render('auth/login', { messages, authUser });
    message();
  })
  .post((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        authUser = true;
        res.redirect('/cms/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        messages = errorMessage;
        res.redirect('/users/login');
      });
  });

users.route('/signup')
  .get((req, res) => {
    res.render('auth/signup', { messages });
    message();
  })
  .post((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        res.redirect('/users/login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        messages = errorMessage;
        res.redirect('/users/signup');
      });
  });

users.route('/logout')
  .get((req, res, next) => {
    firebase.auth().signOut()
      .then(() => {
        authUser = false;
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

users.route('/reset-password')
  .get((req, res) => {
    res.render('auth/reset-password', { messages });
    console.log(messages)
    message();
  })
  .post((req, res, next) => {
    const auth = firebase.auth();
    const emailAddress = req.body.email;

    auth.sendPasswordResetEmail(emailAddress)
      .then(() => {
        console.log('Email sent');
        res.redirect('/users/login');
      }, (error) => {
        console.log('An error happened.')
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ': ' + errorMessage);
      });
  });

module.exports = users;
