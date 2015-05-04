// View.js
// -------
define(["jquery",
		"backbone",
		"savageworlds/models/Character",
		"text!savageworlds/display/templates/characterDetailView.html",
		"savageworlds/display/views/SkillListView",
		"savageworlds/display/views/EdgeListView",
		"savageworlds/display/views/HindranceListView",
		"savageworlds/display/views/WeaponListView",
		"savageworlds/display/views/PowerListView",
		"savageworlds/display/views/EquipmentListView",
		"savageworlds/display/views/AdvancementView"
	],

	function($, Backbone, Character, template,
		SkillListView, EdgeListView, HindranceListView, WeaponListView,
		PowerListView, EquipmentListView, AdvancementView) {

		var View = Backbone.View.extend({
			// View constructor
			initialize: function(options) {
				this.router = options.router;
				this.subviews = [];

				this.addSubView(SkillListView, 'skills');
				this.addSubView(EquipmentListView, 'equipment');
				this.addSubView(EdgeListView, 'edges');
				this.addSubView(HindranceListView, 'hindrances');
				this.addSubView(WeaponListView, 'weapons');
				this.addSubView(PowerListView, 'powers');
				this.addSubView(AdvancementView, 'advancement', true);

				this.listenTo(this.model, 'change', this.render);
			},

			addSubView: function(ViewConstructor, property, useModel) {
				if (useModel) {
					this.subviews.push({
						view: new ViewConstructor({
							model: this.model.get("gameStuff." + property)
						}),
						anchor: "#" + property
					});
				} else {
					this.subviews.push({
						view: new ViewConstructor({
							collection: this.model.get("gameStuff." +
								property)
						}),
						anchor: "#" + property
					});
				}
			},

			close: function() {
				this.subviews.forEach(function(item) {
					item.view.close();
				}.bind(this));
				this.remove();
				this.unbind();
			},

			// View Event Handlers
			events: {
				"click a#editMode": "editMode",
			},

			editMode: function() {
				this.router.navigate("editCharacter?id=" + this.model.get('_id'), true);
			},

			// Renders the view's template to the UI
			render: function() {
				this.$el.html(_.template(template, this.model.toJSON()));

				this.subviews.forEach(function(item) {
					item.view.$el = this.$(item.anchor);
					item.view.render();
					// item.view.delegateEvents();
				}.bind(this));

				return this;
			}

		});

		// Returns the View class
		return View;

	}

);
