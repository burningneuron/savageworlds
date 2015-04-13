// Load required packages
var mongoose = require('mongoose');

// Define our character schema
var CharacterSchema = new mongoose.Schema({
  userId: String,
  name: String,
  race: String,
  rank: String,
  xps: Number,
  money: String,
  baseStats: {
    agility: String,
    smarts: String,
    spirit: String,
    strength: String,
    vigor: String,
    charisma: String,
    charismaModifier: String,
    pace: String,
    sprintDie: String,
    parry: String,
    parryModifier: String,
    toughness: String,
    armor: String,
  },
  otherStats: [{
    name: String,
    value: String
  }],
  armor: {
    head: String,
    torso: String,
    arms: String,
    legs: String
  },
  encumbrance: {
    carried: Number,
    limit: Number,
    penalty: Number
  },
  skills: [{
    name: String,
    value: String
  }],
  edges: [{
    name: String,
    description: String
  }],
  hindrances: [{
    name: String,
    description: String
  }],
  powers: [{
    name: String,
    trappings: String,
    cost: String,
    range: String,
    damage: String,
    duration: String
  }],
  weapons: [{
    name: String,
    range: String,
    rof: String,
    damage: String,
    ap: String,
    weight: Number,
    notes: String
  }],
  equipment: [{
    name: String,
    description: String,
    weight: Number
  }]
});

// Export the Mongoose model
module.exports = mongoose.model('Character', CharacterSchema);
