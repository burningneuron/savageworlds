define(["jquery",
		"backbone",
		"views/ListView",
		"savageworlds/edit/views/SkillDetailView",
		"text!savageworlds/edit/templates/skillListView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, ListView, SkillDetailView, template) {
		var SkillListView = Backbone.View.extend({
			initialize: function(options) {
				this.listView = new ListView({
					childView: SkillDetailView,
					tagName: 'tbody',
					collection: options.collection
				});

			},

			close: function() {
				this.listView.close();
				this.remove();
				this.unbind();
			},

			events: {
				'click a#addSkill': 'addSkill'
			},

			addSkill: function() {
				this.listView.collection.add({
					name: "",
					value: ""
				});
			},

			render: function() {
				this.$el.append(_.template(template, {}));
				this.$("#skillTable").append(this.listView.render().$el);

				return this;
			}
		});

		// Returns the View class
		return SkillListView;
	}
);
