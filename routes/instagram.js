const express = require('express');
// const db = require('./../db/instagram/instagram.js');
const request = require('request');

const instagram = express.Router();

/* api routes */
instagram.route('/')
  .get((req, res) => {
    const url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=2220345295.1677ed0.995fccc0ee1d47b4acb850aff67d534d';

    request(url, (err, res1) => {
      if (err) {
        console.log('error: ', err);
      } else {
        res.json(JSON.parse(res1.body));
      }
    });
  });

module.exports = instagram;
