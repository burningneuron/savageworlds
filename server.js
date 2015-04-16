// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var expressWinston = require('express-winston');
var _ = require('lodash');
// * Internal modules *
var logger = require('./common/logger');
var characterController = require('./controllers/character');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');

var env = require('./config/env.js');

// Connect to the characterlocker MongoDB
mongoose.connect(env.mongoDbConnectString);
var db = mongoose.connection;
db.on('error', function() {
  logger.error('database connection error');
});
db.once('open', function(callback) {
  logger.info('database connected');
});

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('port', (env.port || 5000));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressWinston.logger({
  transports: _.values(logger.transports),
  winstonInstance: logger
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

// Create our Express router
var router = express.Router();

// serve static files
app.use(express.static('ui'));

// Create endpoint handlers for /characters
router.route('/api/characters')
  .post(authController.isAuthenticated, characterController.postCharacters)
  .get(authController.isAuthenticated, characterController.getCharacters);

// Create endpoint handlers for /characters/:character_id
router.route('/api/characters/:character_id')
  .get(authController.isAuthenticated, characterController.getCharacter)
  .put(authController.isAuthenticated, characterController.putCharacter)
  .delete(authController.isAuthenticated, characterController.deleteCharacter);

// Create endpoint handlers for /users
router.route('/api/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// facebook -------------------------------

// send to facebook to do the authentication
app.get('/api/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

// handle the callback after facebook has authenticated the user
app.get(env.facebookCallbackUrl,
  passport.authenticate('facebook', {
    successRedirect: '/success.html',
    failureRedirect: '/fail.html'
  }));

// Create endpoint handlers for /clients
router.route('/api/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/api/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/api/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes
app.use(router);

// Start the server
app.listen(app.get('port'), function() {
  console.log("Savage Worlds running at " + env.baseUrl + ":" +
    app.get(
      'port'));
});
