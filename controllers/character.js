// Load required packages
var Character = require('../models/character');

// Create endpoint /api/characters for POST
exports.postCharacters = function(req, res) {
  // Create a new instance of the Character model
  var character = new Character();

  // Set the character properties that came from the POST data
  character.userId = req.user._id;
  character.name = req.body.character.name;
  character.baseStats = req.body.character.baseStats;
  character.otherStats = req.body.character.otherStats;
  character.skills = req.body.character.skills;
  character.edges = req.body.character.edges;
  character.hindrances = req.body.character.hindrances;
  character.powers = req.body.character.powers;
  character.weapons = req.body.character.weapons;
  character.equipment = req.body.character.equipment;

  // Save the character and check for errors
  character.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Character added to the locker!',
      data: character
    });
  });
};

// Create endpoint /api/characters for GET
exports.getCharacters = function(req, res) {
  // Use the Character model to find all character
  Character.find({
    userId: req.user._id
  }, function(err, characters) {
    if (err)
      res.send(err);

    res.json(characters);
  });
};

// Create endpoint /api/characters/:character_id for GET
exports.getCharacter = function(req, res) {
  // Use the Character model to find a specific character
  Character.find({
    userId: req.user._id,
    _id: req.params.character_id
  }, function(err, character) {
    if (err)
      res.send(err);

    res.json(character);
  });
};

// Create endpoint /api/characters/:character_id for PUT
exports.putCharacter = function(req, res) {
  // Use the Character model to find a specific character
  Character.update({
    userId: req.user._id,
    _id: req.params.character_id
  }, req.body.character.character, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({
      message: num + ' updated'
    });
  });
};

// Create endpoint /api/characters/:character_id for DELETE
exports.deleteCharacter = function(req, res) {
  // Use the Character model to find a specific character and remove it
  Character.remove({
    userId: req.user._id,
    _id: req.params.character_id
  }, function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Character removed from the locker!'
    });
  });
};
