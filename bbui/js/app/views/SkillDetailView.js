define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var SkillDetailView = Backbone.Marionette.ItemView.extend({
      initialize: function(options) {
        this.template = options.template;
      },

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
        'change input.skill': 'updateModel',
        'click a.skill': 'deleteModel'
      },

      deleteModel: function() {
        this.model.destroy();
      },

      updateModel: function() {
        this.model.set('name', this.$("[name='name']").val());
        this.model.set('value', this.$("[name='value']").val());
      },

      render: function() {
        this.$el.html(_.template(this.template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return SkillDetailView;
  }
);
