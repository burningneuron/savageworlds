// View.js
// -------
define(["jquery",
		"backbone",
		"models/User",
		"text!templates/profileView.html"
	],

	function($, Backbone, Model, template) {

		var View = Backbone.View.extend({
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
				"click #characterList": "gotoCharacterList",

			},

			gotoCharacterList: function() {
				this.router.navigate("", true);
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
