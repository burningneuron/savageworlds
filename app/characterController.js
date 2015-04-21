var User = require('./models/user');
var Character = require('./models/character');
var logger = require('../common/logger');
var _ = require('lodash');

var validRequest = function(request, response) {
  var character = null;
  if (!request.body.character ||
    _.isEmpty(request.body.character.name) ||
    _.isEmpty(request.body.character.system)) {
    var sample = {
      name: "some name",
      system: "some system"
    };
    res.status(400).send("Required: request.body.character = " + JSON.stringify(
      sample));
  } else {
    character = request.body.character;
  }

  return character;
};

var getUser = function(req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, function(err, user) {
      res.send(user);
    });
  } else {
    res.send({
      facebook: {},
      twitter: {},
      google: {}
    });
  }
};

var getCharacters = function(req, res) {
  Character.find({
    // userId: req.user.id
  }, function(err, characters) {
    if (err) {
      logger.err("Error on character find " + id + ": " + err);
      res.send(err);
    }

    res.json(characters);
  });
};

var getCharacter = function(req, res) {
  var id = req.params.character_id;

  Character.find({
    _id: id
  }, function(err, character) {
    if (err) {
      logger.err("Error on character find " + id + ": " + err);
      res.send(err);
    }

    res.json(character);
  });
};

var putCharacter = function(req, res) {
  var putChar = validateCharacter(req, res);
  if (putChar) {
    Character.findOne({
      _id: req.params.character_id
    }, function(err, character) {
      if (err) {
        logger.err("Error on character find: " + err);
        res.send(err);
      } else {
        if (character && character.userId === req.user.id) {
          // user owns the character, so update it
          Character.update({
              userId: req.user.id,
              _id: req.params.character_id

            }, putChar,
            function(err, numberAffected, raw) {
              if (err) {
                logger.err("Error on character update: " + err);
                res.send(err);
              } else {
                logger.info("Documents updated: " +
                  numberAffected +
                  "; Raw response from Mongo: " + raw);
                res.json(putChar);
              }
            });
        } else {
          // user does not own, create a copy
          putChar.userId = req.user.id;
          delete putChar._id;
          Character.create(putChar, function(err, character) {
            if (err) {
              logger.err("Error on character creation: " + err);
              res.send(err);
            } else {
              logger.info("Character added: " + character);
              res.json(character);
            }
          });
        }
      }
    });
  }
};

var deleteCharacter = function(req, res) {
  Character.remove({
    _id: req.params.character_id,
    userId: req.user.id
  }, function(err) {
    if (err) {
      logger.err("Error on character delete: " + err);
      res.send(err);
    } else {
      logger.info("Character deleted: " + req.params.character_id);
      res.json(req.params.character_id);
    }
  });
};

var postCharacter = function(req, res) {
  var postChar = validateCharacter(req, res);
  if (postChar) {
    postChar.userId = req.user.id;
    Character.create(postChar, function(err, character) {
      if (err) {
        logger.err("Error on character creation: " + err);
        res.send(err);
      } else {
        logger.info("Character added: " + character);
        res.json(character);
      }
    });
  }
};

module.exports = {
  getUser: getUser,
  getCharacters: getCharacters,
  getCharacter: getCharacter,
  putCharacter: putCharacter,
  deleteCharacter: deleteCharacter,
  postCharacter: postCharacter
};
