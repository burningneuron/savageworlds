define(["jquery",
		"backbone",
		"text!savageworlds/edit/templates/hindranceDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var HindranceDetailView = Backbone.Marionette.ItemView.extend({
			initialize: function(options) {
				this.listenTo(this.model, 'change', this.render);
			},
			tagName: 'tr',

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.hindrance': 'updateModel',
				'click button.hindrance': 'deleteModel',
				'focus input.hindrance': 'scrollLeft'
			},

			scrollLeft: function(event) {
				event.target.scrollLeft = event.target.scrollWidth;
			},

			deleteModel: function() {
				this.model.destroy();
			},

			updateModel: function(event) {
				this.model.set(event.target.name, event.target.value);
			},

			render: function() {
				this.$el.html(_.template(template, this.model.attributes));
				return this;
			}
		});

		// Returns the View class
		return HindranceDetailView;
	}
);
