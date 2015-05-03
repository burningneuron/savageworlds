define(["jquery",
		"backbone",
		"text!savageworlds/edit/templates/equipmentDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var EquipmentDetailView = Backbone.Marionette.ItemView.extend({
			initialize: function(options) {},
			tagName: 'tr',

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.equipment': 'updateModel',
				'click button.equipment': 'deleteModel',
				'focus input.equipment': 'scrollLeft'
			},

			scrollLeft: function(event) {
				event.target.scrollLeft = event.target.scrollWidth;
			},

			deleteModel: function() {
				this.model.destroy();
			},

			updateModel: function() {
				this.model.set('name', this.$("[name='name']").val());
				this.model.set('weight', this.$("[name='weight']").val());
			},

			render: function() {
				this.$el.html(_.template(template, this.model.attributes));
				return this;
			}
		});

		// Returns the View class
		return EquipmentDetailView;
	}
);
