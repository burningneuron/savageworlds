define(["jquery",
		"backbone",
		"text!savageworlds/edit/templates/weaponDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var WeaponDetailView = Backbone.Marionette.ItemView.extend({
			tagName: 'tr',
			initialize: function(options) {
			},

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.weapon': 'updateModel',
				'click button.weapon': 'deleteModel',
				'focus input.weapon': 'scrollLeft'
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
		return WeaponDetailView;
	}
);
