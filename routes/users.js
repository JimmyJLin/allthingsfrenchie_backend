var express       = require('express');
const expressJWT  = require('express-jwt');
const jwt         = require( 'jsonwebtoken' );
var users         = express.Router();
var bodyParser    = require('body-parser');
var db            = require('./../db/pgp/users.js');
const secret      = 'sosecret';


// applicant user auth
users.route('/applicants')
  .get( db.showAllApplicantUsers, (req, res) => {
    res.send(res.rows);
  })

users.route('/applicants/login')
  .post(db.loginApplicantUser, ( req, res ) => {
    var token = jwt.sign( res.rows, secret );
    res.json( { agent: res.rows, token: token } );
  })

users.route('/applicants/signup')
  .post( db.createApplicantUser, ( req, res ) => {
    console.log('request us receieved', req )
    res.status( 201 ).json( { data: 'success' } );
  });

users.route('/applicant/:identifier')
  .get( db.applicantProfileCheck, (req, res) => {
    res.send(res.rows);
  })


// employer user auth
users.route('/employers')
  .get( db.showAllEmployerUsers, (req, res) => {
    res.send(res.rows);
  })

users.route('/employers/login')
  .post(db.loginEmployerUser, ( req, res ) => {
    var token = jwt.sign( res.rows, secret );
    res.json( { agent: res.rows, token: token } );
  })

users.route('/employers/signup')
  .post( db.createEmployerUser, ( req, res ) => {
    console.log('request us received', req )
    res.status( 201 ).json( { data: 'success' } );
  });

users.route('/employer/:identifier')
  .get( db.employerProfile, (req, res) => {
    res.send(res.rows);
  })





module.exports = users;
