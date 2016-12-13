const pgp  = require( 'pg-promise' )();
const bcrypt = require('bcrypt');
const salt   = bcrypt.genSaltSync(10);

if(process.env.ENVIRONMENT === 'production') {
  var cn = process.env.DATABASE_URL
} else {
  var cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
}

const db = pgp(cn);

// show all applicant users
function showAllApplicantUsers(req, res, next) {
  db.any('select * from ApplicantUsers;')
  .then(function(data) {
    res.rows= data;
    console.log('this should show all Applicant Users;', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// login applicant user
function loginApplicantUser(req, res, next) {
  var email = req.body.email
  var password = req.body.password
  console.log(req.body, 'loginApplicantUser')
  db.one("SELECT * FROM ApplicantUsers WHERE email LIKE $1;", [email])
    .then((data) => {
      if (bcrypt.compareSync(password, data.password)) {
        res.rows = data
        console.log('res.rows', data)
        next()
      } else {
        res.status(401).json({data:"Fool this no workie"})
        next()
      }
    })
    .catch(() => {
      console.error('error finding users loginApplicantUser')
    })
}

// create Applicant User
function createApplicantUser(req, res, next) {
  console.log('req.body from post request', req.body)
  createSecure(req.body.email, req.body.password, saveUser);
  function saveUser(email, hash) {
    db.none("INSERT INTO ApplicantUsers (email, password, type, name, last_name) VALUES ($1, $2, $3,$4,$5);", [email, hash, req.body.type, req.body.name, req.body.last_name])
    .then(function (data) {
      // success;
      console.log('New Applicant User added', data)
      next();
    })
    .catch(function () {
      // error;
      console.error('error signing up create ApplicantUser');
    });
  }
}

// get applicant profile based on user_id
function applicantProfile(req,res,next){
  db.one("select * from Applicants where user_id = $1",
  [ req.params.uid ])
  .then(function(data) {
    res.rows= data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

function applicantProfileCheck(req,res,next){
  db.one("select * from Applicants where email = $1",
  [ req.params.identifier ])
  .then(function(data) {
    res.rows= data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}


// show all Employer userss
function showAllEmployerUsers(req, res, next) {
  db.any('select * from EmployerUsers;')
  .then(function(data) {
    res.rows= data;
    console.log('this should show all Employer Users;', data)
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

// login employer user
function loginEmployerUser(req, res, next) {
  var email = req.body.email
  var password = req.body.password

  db.one("SELECT * FROM Employers WHERE email LIKE $1;", [email])
    .then((data) => {
      if (bcrypt.compareSync(password, data.password)) {
        res.rows = data
        next()
      } else {
        res.status(401).json({data:"Fool this no workie"})
        next()
      }
    })
    .catch(() => {
      console.error('error finding users loginEmployerUser')
    })
}

function createEmployerUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser);
  function saveUser(email, hash) {
    db.none("INSERT INTO Employers (email, password, first_name, last_name, company_name, company_address, company_city, company_state, company_zip, company_website) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10);",
    [email, hash, req.body.first_name, req.body.last_name, req.body.company_name, req.body.company_address,
    req.body.company_city, req.body.company_state, req.body.company_zip, req.body.company_website])
    .then(function (data) {
      // success;
      console.log('New Employer added')
      next();
    })
    .catch(function () {
      // error;
      console.error('error on Employer signing up');
    });
  }
}


function employerProfile(req,res,next){
  db.one("select * from Employers where email = $1",
  [ req.params.identifier ])
  .then(function(data) {
    res.rows= data;
    next();
  })
  .catch(function(error){
    console.error(error);
  })
}

// User Auth Queries -  CREATE AN ACCOUNT
function createSecure(email, password,callback) {
  console.log('create secure fired')
  //hashing the password given by the user at signup
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.log(hash)
      //this callback saves the user to our databoard
      //with the hashed password
      callback(email,hash);
    })
  })
}



// Applicants Auth exports
module.exports.showAllApplicantUsers = showAllApplicantUsers;
module.exports.loginApplicantUser = loginApplicantUser;
module.exports.createApplicantUser = createApplicantUser;
module.exports.applicantProfile = applicantProfile;
module.exports.applicantProfileCheck = applicantProfileCheck;

// Employers Auth exports
module.exports.showAllEmployerUsers = showAllEmployerUsers;
module.exports.loginEmployerUser = loginEmployerUser;
module.exports.createEmployerUser = createEmployerUser;
module.exports.employerProfile = employerProfile;
