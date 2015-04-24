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
  ],

  function($, Backbone, Character, template,
    SkillListView, EdgeListView, HindranceListView, WeaponListView, PowerListView,
    EquipmentListView) {

    var View = Backbone.View.extend({
      // View constructor
      initialize: function(options) {
        this.router = options.router;
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);

        // this.backgroundView = new CharacterBackgroundView({
        //   model: this.model
        // });

        this.skillView = new SkillListView({
          collection: this.model.get('skills')
        });

        this.equipmentView = new EquipmentListView({
          collection: this.model.get('equipment')
        });

        this.edgeView = new EdgeListView({
          collection: this.model.get('edges')
        });

        this.hindranceView = new HindranceListView({
          collection: this.model.get('hindrances')
        });

        this.weaponView = new WeaponListView({
          collection: this.model.get('weapons')
        });

        this.powerView = new PowerListView({
          collection: this.model.get('powers')
        });

      },

      close: function() {
        this.backgroundView.close();
        this.skillView.close();
        this.edgeView.close();
        this.hindranceView.close();
        this.weaponView.close();
        this.powerView.close();
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

        this.skillView.$el = this.$("#skills");
        this.skillView.render();
        this.skillView.delegateEvents();

        this.equipmentView.$el = this.$("#equipment");
        this.equipmentView.render();
        this.equipmentView.delegateEvents();

        this.edgeView.$el = this.$("#edges");
        this.edgeView.render();
        this.edgeView.delegateEvents();

        this.hindranceView.$el = this.$("#hindrances");
        this.hindranceView.render();
        this.hindranceView.delegateEvents();

        this.weaponView.$el = this.$("#weapons");
        this.weaponView.render();
        this.weaponView.delegateEvents();

        this.powerView.$el = this.$("#powers");
        this.powerView.render();
        this.powerView.delegateEvents();

        return this;

      }

    });

    // Returns the View class
    return View;

  }

);
