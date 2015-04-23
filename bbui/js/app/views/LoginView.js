// View.js
// -------
define(["jquery", "backbone", "models/User", "text!templates/user.html"],

  function($, Backbone, Model, template) {

    var View = Backbone.View.extend({

      // The DOM Element associated with this view
      el: ".login",

      // View constructor
      initialize: function(options) {
        this.router = options.router;
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);
        this.render();

      },

      close: function() {
        this.remove();
        this.unbind();
      },

      // View Event Handlers
      events: {
        "click #facebookbutton": "gotoProfile",
        "click #twitterbutton": "gotoProfile",
        "click #googlebutton": "gotoProfile",

      },

      gotoProfile: function() {
        console.log('gotoProfile');
        this.router.navigate("profile", true);
      },

      // Renders the view's template to the UI
      render: function() {

        // flatten the user model so it plays well with the template code
        this.$el.html(_.template(template, {
          facebookName: this.model.get('facebook.token') ? this.model.get('facebook.name') : null,
          twitterName: this.model.get('twitter.token') ? this.model.get('twitter.username') : null,
          googleName: this.model.get('google.token') ? this.model.get('google.name') : null,
        }));

        // Maintains chainability
        return this;

      }

    });

    // Returns the View class
    return View;

  }

);
