// View.js
// -------
define(["jquery",
		"backbone",
		"models/User",
		"text!templates/characterSummary.html",
		"Backbone.Marionette"
	],

	function($, Backbone, Model, template) {

		var CharacterSummaryView = Backbone.Marionette.ItemView.extend({

			// The DOM Element associated with this view

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
				"click #character": "showCharacter"
			},

			showCharacter: function() {
				this.router.navigate("character?id=" + this.model.get('_id'), true);
			},

			// Renders the view's template to the UI
			render: function() {

				// flatten the user model so it plays well with the template code
				this.$el.html(_.template(template, this.model.attributes));

				// Maintains chainability
				return this;

			}

		});

		// Returns the View class
		return CharacterSummaryView;

	}

);
