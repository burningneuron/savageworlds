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
				var attributeName = event.target.name;
console.log(attributeName);
console.log(this.model.get(attributeName));
				this.model.set(attributeName, event.target.value);
console.log(this.model.get(attributeName));
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
