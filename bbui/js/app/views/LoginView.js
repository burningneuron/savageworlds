// View.js
// -------
define(["jquery",
		"backbone",
		"models/User",
		"text!templates/loginView.html"
	],

	function($, Backbone, Model, template) {

		var View = Backbone.View.extend({

			// The DOM Element associated with this view
			el: ".login",

			// View constructor
			initialize: function(options) {
				this.router = options.router;
				// Calls the view's render method
				this.listenTo(this.model, 'change', this.render);
				this.render();

			},

			close: function() {
				this.remove();
				this.unbind();
			},

			// View Event Handlers
			events: {
				"click #facebookbutton": "gotoProfile",
				"click #twitterbutton": "gotoProfile",
				"click #googlebutton": "gotoProfile",

				"click a.about": "gotoAbout",
				"click a.allCharacters": "showAllCharacters",
				"click a.myCharacters": "showMyCharacters",
			},

			gotoProfile: function() {
				this.router.navigate("profile", true);
			},

			gotoAbout: function() {
				this.router.navigate("", true);
			},

			showAllCharacters: function() {
				this.router.navigate("allCharacters", true);
			},

			showMyCharacters: function() {
				this.router.navigate("myCharacters", true);
			},

			// Renders the view's template to the UI
			render: function() {

				// flatten the user model so it plays well with the template code
				this.$el.html(_.template(template, this.model.toJSON()));

				// Maintains chainability
				return this;

			}

		});

		// Returns the View class
		return View;

	}

);
