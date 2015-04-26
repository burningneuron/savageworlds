define(["jquery",
		"backbone",
		"text!templates/hindranceDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var HindranceDetailView = Backbone.Marionette.ItemView.extend({
			initialize: function(options) {
				this.listenTo(this.model, 'change', this.render);
			},

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.hindrance': 'updateModel',
				'click a.hindrance': 'deleteModel'
			},

			deleteModel: function() {
				this.model.destroy();
			},

			updateModel: function(d) {
				this.model.set('name', this.$("[name='name']").val());
				this.model.set('effect', this.$("[name='effect']").val());
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
