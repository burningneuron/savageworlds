define(["jquery",
		"backbone",
		"views/ListView",
		"savageworlds/edit/views/PowerDetailView",
		"text!savageworlds/edit/templates/powerListView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, ListView, PowerDetailView, template) {
		var PowerListView = Backbone.View.extend({
			initialize: function(options) {
				this.listView = new ListView({
					childView: PowerDetailView,
					collection: options.collection
				});

			},

			close: function() {
				this.listView.close();
				this.remove();
				this.unbind();
			},

			events: {
				'click a#addPower': 'addPower'
			},

			addPower: function() {
				this.listView.collection.add({
					power_points: "",
					name: "",
					trappings: "",
					effect: "",
					duration: "",
					notes: ""
				});
			},

			render: function() {
				this.$el.append(_.template(template, {}));
				this.$("#powerTable").append(this.listView.render().$el);

				return this;
			}
		});

		// Returns the View class
		return PowerListView;
	}
);
