define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var EdgeDetailView = Backbone.Marionette.ItemView.extend({
      initialize: function(options) {
        this.router = options.router;
        this.template = options.template;
        // Calls the view's render method
        // this.listenTo(this.model, 'change', this.render);
        // this.$('input .edgeValue').focus(this.updateModel);
      },

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
        'keyup input.edge': 'updateModel',
        'click a.edge': 'deleteModel'
      },

      deleteModel: function() {
        this.model.destroy();
      },

      updateModel: function(d) {
        this.model.set('name', this.$("[name='name']").val());
        this.model.set('effect', this.$("[name='effect']").val());
      },

      render: function() {
        this.$el.html(_.template(this.template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return EdgeDetailView;
  }
);
