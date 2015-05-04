define(["jquery",
		"backbone",
		"text!savageworlds/edit/templates/skillDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var SkillDetailView = Backbone.Marionette.ItemView.extend({
			initialize: function(options) {},
			tagName: 'tr',

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.skill': 'updateModel',
				'click button.skill': 'deleteModel'
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
		return SkillDetailView;
	}
);
