// View.js
// -------
define(["jquery", "backbone", "models/Character", "text!templates/characterListView.html"],

  function($, Backbone, Model, template) {

    var View = Backbone.View.extend({

      // The DOM Element associated with this view
      el: ".example",

      // View constructor
      initialize: function() {
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);
        this.render();

      },

      // View Event Handlers
      events: {

      },

      // Renders the view's template to the UI
      render: function() {

        // // Setting the view's template property using the Underscore template method
        // this.template = _.template(template, this.model.attributes);
        // Dynamically updates the UI with the view's template
        this.$el.html(_.template(template, this.model.attributes));

        // Maintains chainability
        return this;

      }

    });

    // Returns the View class
    return View;

  }

);
