// View.js
// -------
define(["jquery", "backbone", "models/User", "text!templates/profile.html"],

  function($, Backbone, Model, template) {

    var View = Backbone.View.extend({


      // View constructor
      initialize: function() {
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

      },

      // Renders the view's template to the UI
      render: function() {

        // flatten the user model so it plays well with the template code
        this.$el.html(_.template(template, {
          facebook_id: this.model.get('facebook.id'),
          facebook_token: this.model.get('facebook.token'),
          facebook_email: this.model.get('facebook.email'),
          facebook_name: this.model.get('facebook.name'),

          twitter_id: this.model.get('twitter.id'),
          twitter_token: this.model.get('twitter.token'),
          twitter_displayName: this.model.get('twitter.displayName'),
          twitter_username: this.model.get('twitter.username'),

          google_id: this.model.get('google.id'),
          google_token: this.model.get('google.token'),
          google_email: this.model.get('google.email'),
          google_name: this.model.get('google.name')
        }));

        // Maintains chainability
        return this;

      }

    });

    // Returns the View class
    return View;

  }

);
