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
				setting: "NO SETTING",
				player: "",
				name: "NO NAME",

				gameStuff: {
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
						x5: "",
						x10: "",
						x15: "",
						x20: "",
						x25: "",
						x30: "",
						x35: "",
						x40: "",
						x45: "",
						x50: "",
						x55: "",
						x60: "",
						x65: "",
						x70: "",
						x75: "",
						x80: "",
						x90: "",
						x100: "",
						x110: ""
					},
					skills: [],
					equipment: [],
					edges: [],
					hindrances: [],
					powers: [],
					weapons: []
				}
			},

			// Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
			validate: function(attrs) {

			}

		});

		// Returns the Model class
		return Model;

	}

);
