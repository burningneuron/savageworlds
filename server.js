// server.js
require('dotenv').load();

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

var authRouter = require('./app/auth_routes.js');
var charController = require('./app/characterController');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  // extended: true
}));

app.use(express.static('bbui'));

// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
authRouter.initialize(app, passport); // load our routes and pass in our app and fully configured passport

// read user profile
app.get('/api/user', charController.getUser);

// character CRUD
app.get('/api/character', authRouter.isLoggedIn, charController.getCharacters);
app.get('/api/character/:character_id', charController.getCharacter);
app.put('/api/character/:character_id', authRouter.isLoggedIn,
  charController.putCharacter);
app.delete('/api/character/:character_id', authRouter.isLoggedIn,
  charController.deleteCharacter);
app.post('/api/character', authRouter.isLoggedIn, charController.postCharacter);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
