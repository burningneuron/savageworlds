// View.js
// -------
define(["jquery",
		"backbone",
		"models/Character",
		"text!templates/characterDetailView.html",
		"views/SkillListView",
		"views/EdgeListView",
		"views/HindranceListView",
		"views/WeaponListView",
		"views/PowerListView",
		"views/EquipmentListView",
		"views/AdvancementView"
	],

	function($, Backbone, Character, template,
		SkillListView, EdgeListView, HindranceListView, WeaponListView,
		PowerListView,
		EquipmentListView, AdvancementView) {

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
				"click #save": "save",
				"click #saveAndClose": "saveAndClose",

			},

			updateModel: function() {
				this.model.set('setting', this.$("[name='setting']").val());
				this.model.set('player', this.$("[name='player']").val());
				this.model.set('name', this.$("[name='name']").val());

				this.model.set('gameStuff.race', this.$("[name='race']").val());
				this.model.set('gameStuff.rank', this.$("[name='rank']").val());
				this.model.set('gameStuff.xp', this.$("[name='xp']").val());
				this.model.set('gameStuff.money', this.$("[name='money']").val());

				this.model.set('gameStuff.agility', this.$("[name='agility']").val());
				this.model.set('gameStuff.smarts', this.$("[name='smarts']").val());
				this.model.set('gameStuff.spirit', this.$("[name='spirit']").val());
				this.model.set('gameStuff.strength', this.$("[name='strength']")
					.val());
				this.model.set('gameStuff.vigor', this.$("[name='vigor']").val());

				this.model.set('gameStuff.charisma', this.$("[name='charisma']")
					.val());
				this.model.set('gameStuff.pace', this.$("[name='pace']").val());
				this.model.set('gameStuff.parry', this.$("[name='parry']").val());
				this.model.set('gameStuff.toughness', this.$(
					"[name='toughness']").val());
			},

			save: function() {
				this.model.save({
					success: function() {
						console.log('model save successful');
					}.bind(this),
					failure: function() {
						console.log('model save failed');
					}.bind(this)
				});
			},

			saveAndClose: function() {
				this.save();
				this.router.navigate("", true);
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
