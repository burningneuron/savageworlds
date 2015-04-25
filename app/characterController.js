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
		character = request.body;
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
	_hl(Character.find({}))
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
	var postChar = validRequest(req, res);
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
