define(["jquery",
		"backbone",
		"views/ListView",
		"views/WeaponDetailView",
		"text!templates/weaponListView.html",
		"Backbone.Marionette"
	],
	function($, Backbone, ListView, WeaponDetailView, template) {
		var WeaponListView = Backbone.View.extend({
			initialize: function(options) {
				this.listView = new ListView({
					childView: WeaponDetailView,
					collection: options.collection
				});

			},

			close: function() {
				this.listView.close();
				this.remove();
				this.unbind();
			},

			events: {
				'click a#addWeapon': 'addWeapon'
			},

			addWeapon: function() {
				this.listView.collection.add({
					name: "",
					range: "",
					damage: "",
					rof: "",
					weight: "",
					shots: "",
					min_str: "",
					notes: ""
				});
			},

			render: function() {
				this.$el.append(_.template(template, {}));
				this.$("#weaponTable").append(this.listView.render().$el);

				return this;
			}
		});

		// Returns the View class
		return WeaponListView;
	}
);
