define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var EquipmentDetailView = Backbone.Marionette.ItemView.extend({
      initialize: function(options) {
        this.template = options.template;
      },

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
        'change input.equipment': 'updateModel',
        'click a.equipment': 'deleteModel'
      },

      deleteModel: function() {
        this.model.destroy();
      },

      updateModel: function() {
        this.model.set('name', this.$("[name='name']").val());
        this.model.set('weight', this.$("[name='weight']").val());
      },

      render: function() {
        this.$el.html(_.template(this.template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return EquipmentDetailView;
  }
);
