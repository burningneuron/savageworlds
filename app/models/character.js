// Load required packages
var mongoose = require('mongoose');

// Define our character schema
var CharacterSchema = new mongoose.Schema({
	userId: String,
	system: String,
	name: String,
	setting: String
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);
