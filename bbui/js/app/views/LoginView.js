// View.js
// -------
define(["jquery", "backbone", "models/User", "text!templates/user.html"],

  function($, Backbone, Model, template) {

    var View = Backbone.View.extend({

      // The DOM Element associated with this view
      el: ".login",

      // View constructor
      initialize: function() {
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);
        // this.listenTo(this.model, 'change:facebook.*', this.render);
        // this.listenTo(this.model, 'change:twitter.*', this.render);
        // this.listenTo(this.model, 'change:google.*', this.render);
        this.render();

      },

      // View Event Handlers
      events: {

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
