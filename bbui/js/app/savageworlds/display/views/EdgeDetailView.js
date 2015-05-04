define(["jquery",
    "backbone",
    "text!savageworlds/display/templates/edgeDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, template) {
    var EdgeDetailView = Backbone.Marionette.ItemView.extend({
      tagName: 'tr',
      initialize: function(options) {},

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
        this.$el.html(_.template(template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return EdgeDetailView;
  }
);
