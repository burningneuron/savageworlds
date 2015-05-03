// Load required packages
var mongoose = require('mongoose');

// Define our character schema
var CharacterSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  system: String,
  setting: String,
  player: String,
  name: String,

  gameStuff: mongoose.Schema.Types.Mixed
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);
