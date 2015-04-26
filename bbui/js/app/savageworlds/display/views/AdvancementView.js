define(["jquery",
    "backbone",
    "text!savageworlds/display/templates/advancementView.html"
  ],
  function($, Backbone, template) {
    var AdvancementView = Backbone.View.extend({
      initialize: function(options) {},

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
        'change input.advancement': 'updateModel',
      },

      updateModel: function() {
        this.model.set('x5', this.$("[name='x5']").val());
        this.model.set('x10', this.$("[name='x10']").val());
        this.model.set('x15', this.$("[name='x15']").val());
        this.model.set('x20', this.$("[name='x20']").val());
        this.model.set('x25', this.$("[name='x25']").val());
        this.model.set('x30', this.$("[name='x30']").val());
        this.model.set('x35', this.$("[name='x35']").val());
        this.model.set('x40', this.$("[name='x40']").val());
        this.model.set('x45', this.$("[name='x45']").val());
        this.model.set('x50', this.$("[name='x50']").val());
        this.model.set('x55', this.$("[name='x55']").val());
        this.model.set('x60', this.$("[name='x60']").val());
        this.model.set('x65', this.$("[name='x65']").val());
        this.model.set('x70', this.$("[name='x70']").val());
        this.model.set('x75', this.$("[name='x75']").val());
        this.model.set('x80', this.$("[name='x80']").val());
        this.model.set('x90', this.$("[name='x90']").val());
        this.model.set('x100', this.$("[name='x100']").val());
        this.model.set('x110', this.$("[name='x110']").val());
      },

      render: function() {
        this.$el.html(_.template(template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return AdvancementView;
  }
);
