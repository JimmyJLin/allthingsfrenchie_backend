const express = require('express');
const firebase = require('firebase');

const cms = express.Router();

let authUser;
let userData = '';

// helper functions - starts
function postImageToFirebase(imgFile) {
  const file = imgFile

  const storageRef = firebase.storage().ref();

  const metadata = {
    contentType: 'image/jpeg'
  };

  const uploadTask = storageRef.child('profile' + file.name).put(file, metadata);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    // Get task progress, inlcuding number of bytes uploaded and the total number of bytes to be uploaded

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');

    switch (snapshot.state) {
      case firebase.storage.TaskEvent.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, () => {
    // Upload completed successfully, now we can get the download URL
    const downloadURL = uploadTask.snapshot.downloadURL;
    console.log('link to image', downloadURL);
  });

}

// hlper functions - ends
/* api routes */
cms.route('/', { authUser, userData })
  .get((req, res) => {
    const user = firebase.auth().currentUser;
    const userId = firebase.auth().currentUser.uid;

    if (user) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user.emailVerified) {
          authUser = true;
          firebase.database().ref('/Profiles/' + userId).once('value').then((snapshot) => {
            userData = {
              name: snapshot.val().displayName,
              photoURL: snapshot.val().photoURL
            };
            console.log('userData-----', userData);
            res.render('cms/cms', { authUser, userData });
          });
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
    res.render('cms/add-products', { authUser, userData })
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
    res.render('cms/add-category', { authUser, userData });
  });

cms.route('/inventory')
  .get((req, res) => {
    res.render('cms/inventory', { authUser, userData });
  });

cms.route('/profile')
  .get((req, res) => {
    res.render('profile/profile', { authUser, userData });
  })
  .post((req, res, next) => {
    console.log('name', req.body.name);
    console.log('file', req.body.file);
    console.log('photoURL', req.body.photoURL);
    const imgFile = req.body.file;

    postImageToFirebase(imgFile);

    // const user = firebase.auth().currentUser;
    // console.log('user-UID', user.uid);
    //
    // firebase.database().ref().child('Profiles').child(user.uid).set({
    //   displayName: req.body.name,
    //   photoURL: req.body.photoURL
    // })
    //   .then(() => {
    //     console.log('updated user profile');
    //   }, (error) => {
    //     console.log('error', error.message);
    //   });
  });
module.exports = cms;
