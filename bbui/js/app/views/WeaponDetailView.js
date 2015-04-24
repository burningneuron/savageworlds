define(["jquery", "backbone", "Backbone.Marionette"],
  function($, Backbone) {
    var WeaponDetailView = Backbone.Marionette.ItemView.extend({
      tagName: 'tr',
      
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
        'keyup input.weapon': 'updateModel',
        'click a.weapon': 'deleteModel'
        // 'click a#button': 'updateModel'
        // "keyup .value": "updateModel"
      },

      deleteModel: function() {
        console.log('deleteModel');
        this.model.destroy();
      },

      updateModel: function() {
        console.log('updateModel');
        this.model.set('name', this.$("[name='name']").val());
        this.model.set('range', this.$("[name='range']").val());
        this.model.set('damage', this.$("[name='damage']").val());
        this.model.set('rof', this.$("[name='rof']").val());
        this.model.set('weight', this.$("[name='weight']").val());
        this.model.set('shots', this.$("[name='shots']").val());
        this.model.set('min_str', this.$("[name='min_str']").val());
        this.model.set('notes', this.$("[name='notes']").val());
      },

      render: function() {
        this.$el.html(_.template(this.template, this.model.attributes));
        return this;
      }
    });

    // Returns the View class
    return WeaponDetailView;
  }
);
