// Load required packages
var mongoose = require('mongoose');

// Define our character schema
var CharacterSchema = new mongoose.Schema({
  userId: String,
  system: String,
  setting: String,
  player: String,
  name: String,

  gameStuff: Schema.Types.Mixed
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);
