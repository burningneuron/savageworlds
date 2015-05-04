define(["jquery",
		"backbone",
		"text!savageworlds/display/templates/equipmentDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var EquipmentDetailView = Backbone.Marionette.ItemView.extend({
			tagName: 'tr',
			initialize: function(options) {},

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.equipment': 'updateModel',
				'click a.equipment': 'deleteModel'
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
