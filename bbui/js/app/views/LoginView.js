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
				"click a.characterList": "gotoCharacterList",
			},

			gotoProfile: function() {
				this.router.navigate("profile", true);
			},

			gotoAbout: function() {
				this.router.navigate("", true);
			},

			gotoCharacterList: function() {
				this.router.navigate("characters", true);
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
