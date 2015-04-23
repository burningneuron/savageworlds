// View.js
// -------
define(["jquery",
    "backbone",
    "models/Character",
    "views/ListView",
    "text!templates/characterDetailView.html",
    "text!templates/skillDetailView.html",
    "views/SkillView"
  ],

  function($, Backbone, Character, ListView, template, skillTemplate, SkillView) {

    var View = Backbone.View.extend({


      // View constructor
      initialize: function(options) {
        this.router = options.router;
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);

        this.skillListView = new SkillView({
          template: skillTemplate,
          router: this.router,
          collection: this.model.get('skills')
        });

        this.render();
      },

      close: function() {
        this.skillListView.close();
        this.remove();
        this.unbind();
      },

      // View Event Handlers
      events: {
        "click #characterList": "gotoCharacterList",

      },

      gotoCharacterList: function() {
        this.router.navigate("", true);
      },

      // Renders the view's template to the UI
      render: function() {

        // flatten the user model so it plays well with the template code
        this.$el.html(_.template(template, this.model.attributes));

        this.$("#skills").append(this.skillListView.render().el);
        // Maintains chainability
        return this;

      }

    });

    // Returns the View class
    return View;

  }

);
