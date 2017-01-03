require( 'dotenv' ).config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')({});
const cors = require('cors');
const engine = require('ejs-mate');
const firebase = require('firebase');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');


/* app setting */
const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port);
const request = require('request');

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBwn_tYt7de4xk9-iAGhe016LykoSMmh4s',
  authDomain: 'allthingsfrenchie-ce237.firebaseapp.com',
  databaseURL: 'https://allthingsfrenchie-ce237.firebaseio.com',
  storageBucket: 'allthingsfrenchie-ce237.appspot.com',
  messagingSenderId: '1073675691297'
};
firebase.initializeApp(config);

// express server settings
app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'jimmylin@gmail'
}));
app.use(flash());

app.set('views', './views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// routes
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/users');
const cmsRoutes = require('./routes/cms');
const instagramRoute = require('./routes/instagram');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');

// backend app APIs
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/cms', cmsRoutes);

// consumable APIs
app.use('/api/instagram', instagramRoute);
app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);

console.log('Listening on: ' + port);
