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
        money: "500",

        agility: "d4",
        smarts: "d4",
        spirit: "d4",
        strength: "d4",
        vigor: "d4",

        pace: "6 (+d6)",
        parry: "2",
        toughness: "4",
        charisma: "0",

        advancement: {
          x5:"",x10:"",x15:"",x20:"",x25:"",x30:"",x35:"",
          x40:"",x45:"",x50:"",x55:"",x60:"",x65:"",x70:"",x75:"",
          x80:"",x90:"",x100:"",x110:""
        },
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
        equipment: [{
          name: "Backpack",
          weight: "2"
        }, {
          name: "Bedroll",
          weight: "4"
        }],
        edges: [{
          name: "Ace",
          requirements: "N, A d8",
          effect: "+2 to Boating, Driving, Piloting; may make Soak rolls for vehicle at –2"
        }, {
          name: "Quick",
          requirements: "N",
          effect: "Discard draw of 5 or less for new card"
        }],
        hindrances: [{
          name: "Heroic",
          type: "Major",
          effect: "Character always helps those in need"
        }, {
          name: "Quirk",
          type: "Minor",
          effect: "Character has some minor but persistent foible"
        }, {
          name: "Cautious",
          type: "Minor",
          effect: "Character is overly careful"
        }],
        powers: [{
          power_points: "2",
          name: "Armor",
          trappings: "Protection Spell",
          effect: "2 Armor",
          duration: "3 (1/round)",
          notes: "4 Armor on a raise"
        }],
        weapons: [{
          name: "Glock (9mm)",
          range: "12/24/48",
          damage: "2d6",
          rof: "1",
          weight: "3",
          shots: "17",
          min_str: "",
          notes: "AP 1, Semi-Auto"
        }]
      },

      // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
      validate: function(attrs) {

      }

    });

    // Returns the Model class
    return Model;

  }

);
