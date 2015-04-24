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
    SkillListView, EdgeListView, HindranceListView, WeaponListView, PowerListView,
    EquipmentListView, AdvancementView) {

    var View = Backbone.View.extend({
      // View constructor
      initialize: function(options) {
        this.router = options.router;
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);

        // this.backgroundView = new CharacterBackgroundView({
        //   model: this.model
        // });

        this.subviews = [];

        this.addSubView(SkillListView, 'skills');
        this.addSubView(EquipmentListView, 'equipment');
        this.addSubView(EdgeListView, 'edges');
        this.addSubView(HindranceListView, 'hindrances');
        this.addSubView(WeaponListView, 'weapons');
        this.addSubView(PowerListView, 'powers');
        this.addSubView(AdvancementView, 'advancement', true);

      },

      addSubView: function(ViewConstructor, property, useModel) {
        if (useModel) {
          this.subviews.push({
            view: new ViewConstructor({
              model: this.model.get(property)
            }),
            anchor: "#" + property
          });
        } else {
          this.subviews.push({
            view: new ViewConstructor({
              collection: this.model.get(property)
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
        "click #characterList": "gotoCharacterList",
        "change input.base": "updateModel"

      },

      updateModel: function() {
        this.model.set('setting', this.$("[name='setting']").val());
        this.model.set('player', this.$("[name='player']").val());
        this.model.set('name', this.$("[name='name']").val());
        this.model.set('race', this.$("[name='race']").val());
        this.model.set('rank', this.$("[name='rank']").val());
        this.model.set('xp', this.$("[name='xp']").val());
        this.model.set('money', this.$("[name='money']").val());

        this.model.set('agility', this.$("[name='agility']").val());
        this.model.set('smarts', this.$("[name='smarts']").val());
        this.model.set('spirit', this.$("[name='spirit']").val());
        this.model.set('strength', this.$("[name='strength']").val());
        this.model.set('vigor', this.$("[name='vigor']").val());

        this.model.set('charisma', this.$("[name='charisma']").val());
        this.model.set('pace', this.$("[name='pace']").val());
        this.model.set('parry', this.$("[name='parry']").val());
        this.model.set('toughness', this.$("[name='toughness']").val());
      },

      gotoCharacterList: function() {
        console.log(this.model.toJSON());
        // this.router.navigate("", true);
      },

      // Renders the view's template to the UI
      render: function() {
        this.$el.html(_.template(template, this.model.attributes));

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
