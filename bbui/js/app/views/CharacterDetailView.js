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
  ],

  function($, Backbone, Character, template, SkillListView, EdgeListView, HindranceListView, WeaponListView) {

    var View = Backbone.View.extend({
      // View constructor
      initialize: function(options) {
        this.router = options.router;
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);

        this.skillView = new SkillListView({
          router: this.router,
          collection: this.model.get('skills')
        });

        this.edgeView = new EdgeListView({
          router: this.router,
          collection: this.model.get('edges')
        });

        this.hindranceView = new HindranceListView({
          router: this.router,
          collection: this.model.get('hindrances')
        });

        this.weaponView = new WeaponListView({
          router: this.router,
          collection: this.model.get('weapons')
        });

      },

      close: function() {
        this.skillView.close();
        this.remove();
        this.unbind();
      },

      // View Event Handlers
      events: {
        "click #characterList": "gotoCharacterList",

      },

      gotoCharacterList: function() {
        console.log(this.model.toJSON());
        // this.router.navigate("", true);
      },

      // Renders the view's template to the UI
      render: function() {
console.log('main render');
        this.$el.html(_.template(template, this.model.attributes));

        this.skillView.$el = this.$("#skills");
        this.skillView.render();
        this.skillView.delegateEvents();

        this.edgeView.$el = this.$("#edges");
        this.edgeView.render();
        this.edgeView.delegateEvents();

        this.hindranceView.$el = this.$("#hindrances");
        this.hindranceView.render();
        this.hindranceView.delegateEvents();

        this.weaponView.$el = this.$("#weapons");
        this.weaponView.render();
        this.weaponView.delegateEvents();

        return this;

      }

    });

    // Returns the View class
    return View;

  }

);
