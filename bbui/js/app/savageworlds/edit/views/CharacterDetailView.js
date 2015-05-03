// View.js
// -------
define(["jquery",
		"backbone",
		"savageworlds/models/Character",
		"text!savageworlds/edit/templates/characterDetailView.html",
		"savageworlds/edit/views/SkillListView",
		"savageworlds/edit/views/EdgeListView",
		"savageworlds/edit/views/HindranceListView",
		"savageworlds/edit/views/WeaponListView",
		"savageworlds/edit/views/PowerListView",
		"savageworlds/edit/views/EquipmentListView",
		"savageworlds/edit/views/AdvancementView"
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
				"change input.base": "updateModel",
				"click a#save": "save",
				"click a#saveAndClose": "saveAndClose",
				"click a#displayMode": "displayMode",
				'focus input.base': 'scrollLeft',
			},

			scrollLeft: function(event) {
				event.target.scrollLeft = event.target.scrollWidth;
			},

			displayMode: function() {
				var router = this.router;
				var model = this.model;
				this.model.save(null, {
					success: function() {
						console.log('model save successful');
						router.navigate("showCharacter?id=" + model.get('_id'), true);
					},
					failure: function() {
						console.log('model save failed');
					}
				});
			},

			updateModel: function(event) {
				this.model.set(event.target.name, event.target.value);
			},

			save: function() {
				// console.log(this.model.toJSON());
				this.model.save(null, {
					success: function() {
						console.log('model save successful');
					}.bind(this),
					failure: function() {
						console.log('model save failed');
					}.bind(this)
				});
			},

			saveAndClose: function() {
				var router = this.router;
				this.model.save(null, {
					success: function() {
						console.log('model save successful');
						router.navigate("characters", true);
					},
					failure: function() {
						console.log('model save failed');
					}
				});
			},

			// Renders the view's template to the UI
			render: function() {
				this.$el.html(_.template(template, this.model.toJSON()));

				this.subviews.forEach(function(item) {
					item.view.$el = this.$(item.anchor);
					item.view.render();
					item.view.delegateEvents();
				}.bind(this));

				return this;
			}

		});

		// Returns the View class
		return View;

	}

);
