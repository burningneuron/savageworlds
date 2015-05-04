define(["jquery",
		"backbone",
		"text!savageworlds/edit/templates/powerDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var PowerDetailView = Backbone.Marionette.ItemView.extend({

			initialize: function(options) {},
			tagName: 'tr',

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.power': 'updateModel',
				'click button.power': 'deleteModel'
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
		return PowerDetailView;
	}
);
