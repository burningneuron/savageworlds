define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var PowerDetailView = Backbone.Marionette.ItemView.extend({

      initialize: function(options) {
        this.router = options.router;
        this.template = options.template;
        // Calls the view's render method
        // this.listenTo(this.model, 'change', this.render);
        // this.$('input .skillValue').focus(this.updateModel);
      },

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
        'keyup input.power': 'updateModel',
        'click a.power': 'deleteModel'
        // 'click a#button': 'updateModel'
        // "keyup .value": "updateModel"
      },

      deleteModel: function() {
        this.model.destroy();
      },

      updateModel: function() {
        this.model.set('power_points', this.$("[name='power_points']").val());
        this.model.set('name', this.$("[name='name']").val());
        this.model.set('trappings', this.$("[name='trappings']").val());
        this.model.set('effect', this.$("[name='effect']").val());
        this.model.set('duration', this.$("[name='duration']").val());
        this.model.set('notes', this.$("[name='notes']").val());
      },

      render: function() {
        this.$el.html(_.template(this.template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return PowerDetailView;
  }
);
