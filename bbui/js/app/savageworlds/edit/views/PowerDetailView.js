define(["jquery",
		"backbone",
		"text!savageworlds/edit/templates/powerDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var PowerDetailView = Backbone.Marionette.ItemView.extend({

			initialize: function(options) {},

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.power': 'updateModel',
				'click a.power': 'deleteModel'
			},

			deleteModel: function() {
				this.model.destroy();
			},

			updateModel: function() {
				this.model.set('power_points', this.$("[name='power_points']").val());
				this.model.set('name', this.$("[name='name']").val());
				this.model.set('trappings', this.$("[name='trappings']").val());
				this.model.set('effect', this.$("[name='effect']").val());
				this.model.set('duration', this.$("[name='duration']").val());
				this.model.set('notes', this.$("[name='notes']").val());
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
