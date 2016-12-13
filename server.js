require( 'dotenv' ).config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')({});
const cors = require('cors');
const engine = require('ejs-mate');



/* app setting */
const app = express();
const port = process.env.PORT || 8080;
const server = app.listen(port);
const request = require('request');


// express server settings
app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'ejs');

// routes
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);
app.use('/', mainRoutes);
