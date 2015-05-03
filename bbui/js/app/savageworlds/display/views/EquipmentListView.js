define(["jquery",
		"backbone",
		"views/ListView",
		"savageworlds/display/views/EquipmentDetailView",
		"text!savageworlds/display/templates/equipmentListView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, ListView, EquipmentDetailView, template) {
		var EquipmentListView = Backbone.View.extend({
			initialize: function(options) {
				this.listView = new ListView({
					childView: EquipmentDetailView,
					collection: options.collection,
					tagName: 'tbody'
				});

			},

			close: function() {
				this.listView.close();
				this.remove();
				this.unbind();
			},

			events: {
				'click a#addEquipment': 'addEquipment'
			},

			addEquipment: function() {
				this.listView.collection.add({
					name: "",
					weight: ""
				});
			},

			render: function() {
				this.$el.append(_.template(template, {}));
				this.$("#equipmentTable").append(this.listView.render().$el);

				return this;
			}
		});

		// Returns the View class
		return EquipmentListView;
	}
);
