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
				userName: "Unknown",
				system: "Savage Worlds",
				setting: "NO SETTING",
				player: "",
				name: "NO NAME",
			},

			// Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
			validate: function(attrs) {

			}

		});

		// Returns the Model class
		return Model;

	}

);
