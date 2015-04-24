define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var EquipmentDetailView = Backbone.Marionette.ItemView.extend({
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
        'keyup input.equipment': 'updateModel',
        'click a.equipment': 'deleteModel'
        // 'click a#button': 'updateModel'
        // "keyup .value": "updateModel"
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
