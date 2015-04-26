define(["jquery",
		"backbone",
		"text!savageworlds/display/templates/weaponDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var WeaponDetailView = Backbone.Marionette.ItemView.extend({

			initialize: function(options) {},

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.weapon': 'updateModel',
				'click a.weapon': 'deleteModel'
			},

			deleteModel: function() {
				this.model.destroy();
			},

			updateModel: function() {
				this.model.set('name', this.$("[name='name']").val());
				this.model.set('range', this.$("[name='range']").val());
				this.model.set('damage', this.$("[name='damage']").val());
				this.model.set('rof', this.$("[name='rof']").val());
				this.model.set('weight', this.$("[name='weight']").val());
				this.model.set('shots', this.$("[name='shots']").val());
				this.model.set('min_str', this.$("[name='min_str']").val());
				this.model.set('notes', this.$("[name='notes']").val());
			},

			render: function() {
				this.$el.html(_.template(template, this.model.attributes));
				return this;
			}
		});

		// Returns the View class
		return WeaponDetailView;
	}
);
