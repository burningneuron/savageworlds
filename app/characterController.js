var User = require('./models/user');
var Character = require('./models/character');
var logger = require('../common/logger');
var _ = require('lodash');
var _hl = require('highland');

var validRequest = function(request, response) {
	var character = null;
	logger.info("incoming data: " + JSON.stringify(request.body));
	if (!request.body ||
		_.isEmpty(request.body.name) ||
		_.isEmpty(request.body.system)) {
		var sample = {
			name: "some name",
			system: "some system"
		};
		response.status(400).send("Required: request.body.character = " + JSON.stringify(
			sample));
	} else {
		character = Character(request.body);
		character.markModified('gameStuff');
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

var setCharacterDefaults = function(character) {
	// character.name = _.isEmpty(character.name) ? "* no name *" : character.name;
	// character.system = _.isEmpty(character.system) ? "* no system *" : character.system;
	// character.setting = _.isEmpty(character.setting) ? "* no setting *" : character.setting;
	return character;
};

var getCharacters = function(req, res) {
	_hl(Character.find({
	  userId: req.user ? req.user.id : 0
	}))
		.flatten()
		.map(setCharacterDefaults)
		.toArray(function(characters) {
			res.json(characters);
		});
};

var getCharacter = function(req, res) {
	var id = req.params.character_id;

	_hl(Character.find({
			_id: id
		}))
		.flatten()
		.map(setCharacterDefaults)
		.take(1)
		.each(function(characters) {
			res.json(characters);
		});
};

var putCharacter = function(req, res) {
	var putChar = validRequest(req, res);
	if (putChar) {
		Character.findOne({
			_id: req.params.character_id
		}, function(err, character) {
			if (err) {
				logger.error("Error on character find: " + err);
				res.send(err);
			} else {
				if (character && character.userId === req.user.id) {
					// user owns the character, so update it
          character.system = putChar.system;
  				character.setting = putChar.setting;
  				character.player = putChar.player;
          character.name = putChar.name;
          character.gameStuff = putChar.gameStuff;
          character.markModified('gameStuff');
          character.save();
          res.json(character);
				} else {
					logger.info("Current user does not own this character, creating a copy.");

					Character.create({
						userId: req.user.id,
						system: putChar.system,
	  				setting: putChar.setting,
	  				player: putChar.player,
	          name: putChar.name,
	          gameStuff: putChar.gameStuff,

					}, function(err, newCharacter) {
						if (err) {
							logger.error("Error on character creation: " + err);
							res.send(err);
						} else {
							logger.info("Character added: " + newCharacter);
							res.json(newCharacter);
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
			logger.error("Error on character delete: " + err);
			res.send(err);
		} else {
			logger.info("Character deleted: " + req.params.character_id);
			res.json(req.params.character_id);
		}
	});
};

var postCharacter = function(req, res) {
	var postChar = validRequest(req, res);
	if (postChar) {
		postChar.userId = req.user.id;
		Character.create(postChar, function(err, character) {
			if (err) {
				logger.error("Error on character creation: " + err);
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
