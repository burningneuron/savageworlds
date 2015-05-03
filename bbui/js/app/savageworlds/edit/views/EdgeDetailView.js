define(["jquery",
    "backbone",
    "text!savageworlds/edit/templates/edgeDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, template) {
    var EdgeDetailView = Backbone.Marionette.ItemView.extend({

      initialize: function(options) {},
      tagName: 'tr',

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {
        'change input.edge': 'updateModel',
        'click button.edge': 'deleteModel',
        'focus input.edge': 'scrollLeft'
      },

      scrollLeft: function(event) {
				event.target.scrollLeft = event.target.scrollWidth;
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
