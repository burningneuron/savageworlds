define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var ListItemView = Backbone.Marionette.ItemView.extend({
      initialize: function(options) {
        this.router = options.router;
        this.template = options.template;
        // Calls the view's render method
        this.listenTo(this.model, 'change', this.render);
        this.render();
      },

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
      },

      render: function() {
        this.$el.html(_.template(this.template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return ListItemView;
  }
);
