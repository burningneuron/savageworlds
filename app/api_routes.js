var isLoggedIn = require('./auth_routes.js').isLoggedIn;
var User = require('./models/user');
var Character = require('./models/character');
var logger = require('../common/logger');

var initialize = function(app) {
  app.get('/api/user', isLoggedIn, function(req, res) {
    User.findById(req.user.id, function(err, user) {
      res.send(user);
    });
  });

  app.get('/api/character', isLoggedIn, function(req, res) {
    Character.find({
      userId: req.user.id
    }, function(err, characters) {
      if (err)
        res.send(err);

      res.json(characters);
    });

  });

  app.get('/api/character/:character_id', function(req, res) {
    Character.find({
      _id: req.params.character_id
    }, function(err, character) {
      if (err) {
        logger.err("Error on character find: " + err);
        res.send(err);
      }

      res.json(character);
    });
  });

  app.post('/api/character', isLoggedIn, function(req, res) {
    // if the character has a valid id
    if (req.body.character && req.body.character._id) {
      // check to see if the character is owned by the current user
      Character.find({
        _id: req.body.character._id
      }, function(err, character) {
        if (err) {
          logger.err("Error on character find: " + err);
          res.send(err);
        } else {
          if (character[0].userId === req.user.id) {
            // user owns the character, so update it
            Character.update({
              userId: req.user.id,
              _id: req.body.character._id

            }, req.body.character, function(err, numberAffected,
              raw) {
              if (err) {
                logger.err("Error on character update: " + err);
                res.send(err);
              } else {
                logger.info("Documents updated: " +
                  numberAffected +
                  "; Raw response from Mongo: " + raw);
                res.json(req.body.character);
              }
            });
          } else {
            // user does not own, create a copy
          }

        }
      });
    } else {
      logger.info("req.body = " + JSON.stringify(req.body));
      req.body.character.userId = req.user.id;
      Character.create(req.body.character, function(err, character) {
        if (err) {
          logger.err("Error on character creation: " + err);
          res.send(err);
        } else {
          logger.info("Character added: " + character);
          res.json(req.body.character);
        }
      });
    }

  });
};


module.exports = {
  initialize: initialize
};
