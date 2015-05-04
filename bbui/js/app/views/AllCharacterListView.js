// View.js
// -------
define(["jquery",
		"backbone",
		"views/ListView",
		"text!templates/allCharacterListView.html",
		"views/AllCharacterSummaryView",
		"Backbone.Marionette"
	],

	function($, Backbone, ListView, template, CharacterSummaryView) {

		var CharacterListView = Backbone.View.extend({
			childView: CharacterSummaryView,
			// The DOM Element associated with this view
			template: template,

			initialize: function(options) {
				this.listView = new ListView({
          childView: CharacterSummaryView,
          collection: options.collection,
					router: options.router,
					tagName: 'tbody'
        });

				this.collection = options.collection;
				this.router = options.router;
			},

			close: function() {
				this.remove();
				this.unbind();
			},

			events: {
				"click a#userName": "sortByUserName",
				"click a#name": "sortByName",
				"click a#setting": "sortBySetting",
				"click a#system": "sortBySystem",
			},

			sortByUserName: function() {
				this.collection.comparator = 'userName';
				this.collection.sort();
			},

			sortByName: function() {
				this.collection.comparator = 'name';
				this.collection.sort();
			},

			sortBySetting: function() {
				this.collection.comparator = 'setting';
				this.collection.sort();
			},

			sortBySystem: function() {
				this.collection.comparator = 'system';
				this.collection.sort();
			},

			render: function() {
				this.$el.append(_.template(template, {}));
				this.$("#characterTable").append(this.listView.render().$el);

				return this;
			}

		});

		// Returns the CharacterListView class
		return CharacterListView;

	}

);
