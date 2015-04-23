// Model.js
// --------
define(["jquery", "backbone", "Backbone.DocumentModel"],

  function($, Backbone) {

    // Creates a new Backbone Model class object
    var Model = Backbone.DocumentModel.extend({
      idAttribute: '_id',
      urlRoot: '/api/character',

      // Model Constructor
      initialize: function() {

      },

      // Default values for all of the Model attributes
      defaults: {
        system: "Savage Worlds",
        setting: "*none*",
        player: "",

        name: "Test Character",
        race: "Human",
        rank: "Novice",
        xp: "0",

        agility: "d4",
        smarts: "d4",
        spirit: "d4",
        strength: "d4",
        vigor: "d4",

        pace: "6 (+d6)",
        parry: "2",
        toughness: "4",
        charisma: "0",

        skills: [{
            name: "Shooting",
            value: "d8"
          }, {
            name: "Knowledge (Security Systems)",
            value: "d6"
          }, {
            name: "Notice",
            value: "d10"
          }],
        edges: [{
          name: "Ace",
          requirements: "N, A d8",
          effects: "+2 to Boating, Driving, Piloting; may make Soak rolls for vehicle at –2"
        },{
          name: "Quick",
          requirements: "N",
          effects: "Discard draw of 5 or less for new card"
        }],
        hindrances: [{
          name: "Heroic",
          type: "Major",
          effects: "Character always helps those in need"
        },{
          name: "Quirk",
          type: "Minor",
          effects: "Character has some minor but persistent foible"
        },{
          name: "Cautious",
          type: "Minor",
          effects: "Character is overly careful"
        }],
        powers: []
      },

      // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
      validate: function(attrs) {

      }

    });

    // Returns the Model class
    return Model;

  }

);
