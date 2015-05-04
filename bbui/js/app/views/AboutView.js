define(["jquery",
    "backbone",
    "text!templates/aboutView.html",
  ],
  function($, Backbone, template) {
    var AboutView = Backbone.View.extend({

      initialize: function(options) {},

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
      },

      render: function() {
        this.$el.html(_.template(template, {}));
        return this;
      }
    });

    // Returns the View class
    return AboutView;
  }
);
