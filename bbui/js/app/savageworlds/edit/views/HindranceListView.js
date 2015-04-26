define(["jquery",
		"backbone",
		"views/ListView",
		"savageworlds/edit/views/HindranceDetailView",
		"text!savageworlds/edit/templates/hindranceListView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, ListView, HindranceDetailView, template) {
		var HindranceListView = Backbone.View.extend({
			initialize: function(options) {
				this.listView = new ListView({
					childView: HindranceDetailView,
					collection: options.collection
				});
			},

			close: function() {
				this.listView.close();
				this.remove();
				this.unbind();
			},

			events: {
				'click a#addHindrance': 'addHindrance'
			},

			addHindrance: function() {
				this.listView.collection.add({
					name: "",
					effect: ""
				});
			},

			render: function() {
				this.$el.append(_.template(template, {}));
				this.$("#hindranceTable").append(this.listView.render().$el);
				return this;
			}
		});

		// Returns the View class
		return HindranceListView;
	}
);
