define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var EdgeDetailView = Backbone.Marionette.ItemView.extend({
      initialize: function(options) {
        this.template = options.template;
      },

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
        'change input.edge': 'updateModel',
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
