const express = require('express');
const firebase = require('firebase');

const auth = express.Router();

/* api routes */
auth.route('/login')
  .get((req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
      res.json({
        status: 200,
        message: 'user logged in'
      });
    } else {
      res.send(404).json({ message: 'user is not currenlty signed in' });
    }
  })
  .post((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        let uid;
        let userEmail;
        let emailVerified;
        const user = firebase.auth().currentUser;
        if (user) {
          uid = user.uid;
          userEmail = user.email;
          emailVerified = user.emailVerified;
          console.log('user id ---->', uid);
          console.log('user email ===>', userEmail);
          console.log('user emailVerified ===>', emailVerified);
          res.json({
            status: 200,
            userId: uid,
            email: userEmail,
            verifyEmail: emailVerified
          });
        } else {
          console.log('no uid found');
        }
      })
      .catch((error) => {
        res.sendStatus(400);
        const errorMessage = error.message;
        console.log('Errors: ', errorMessage);
      });
  });

auth.route('/signup')
  .get((req, res) => {
    res.sendStatus(200);
  })
  .post((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        let uid;
        const user = firebase.auth().currentUser;
        if (user) {
          uid = user.uid;
          user.sendEmailVerification()
            .then(() => {
              res.json({
                status: 200,
                emailVerified: user.emailVerified,
                userId: uid
              });
              console.log('Email sent');
            }, (error) => {
              res.sendStatus(400);
              const errorMessage = error.message;
              console.log('Errors: ', errorMessage);
            });
        } else {
          console.log('no uid found');
        }
      })
      .catch((error) => {
        res.sendStatus(400);
        const errorMessage = error.message;
        console.log('Errors: ', errorMessage);
      });
  });

auth.route('/logout')
  .get((req, res, next) => {
    firebase.auth().signOut()
      .then(() => {
        res.sendStatus(200);
      }, (error) => {
        res.sendStatus(400);
        const errorMessage = error.message;
        console.log('Errors: ', errorMessage);
      });
  });

auth.route('/verify-email')
  .get((req, res) => {
    res.render('auth/verify-email');
  })
  .post((req, res, next) => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification()
      .then(() => {
        res.sendStatus(200);
        console.log('Email sent');
      }, (error) => {
        res.sendStatus(400);
        const errorMessage = error.message;
        console.log('Errors: ', errorMessage);
      });
  });

auth.route('/reset-password')
  .get((req, res) => {
    res.render('auth/reset-password');
  })
  .post((req, res, next) => {
    const auth = firebase.auth();
    const emailAddress = req.body.email;

    auth.sendPasswordResetEmail(emailAddress)
      .then(() => {
        res.sendStatus(200);
        console.log('Email sent');
      }, (error) => {
        res.sendStatus(400);
        const errorMessage = error.message;
        console.log('Errors: ', errorMessage);
      });
  });


module.exports = auth;
