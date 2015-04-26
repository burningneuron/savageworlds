define(["jquery",
		"backbone",
		"text!savageworlds/edit/templates/skillDetailView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, template) {
		var SkillDetailView = Backbone.Marionette.ItemView.extend({
			initialize: function(options) {},

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				'change input.skill': 'updateModel',
				'click a.skill': 'deleteModel'
			},

			deleteModel: function() {
				this.model.destroy();
			},

			updateModel: function() {
				this.model.set('name', this.$("[name='name']").val());
				this.model.set('value', this.$("[name='value']").val());
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
