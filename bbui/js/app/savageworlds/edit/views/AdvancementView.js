define(["jquery",
    "backbone",
    "text!savageworlds/edit/templates/advancementView.html"
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
        'focus input.advancement': 'scrollLeft'
      },

      scrollLeft: function(event) {
				event.target.scrollLeft = event.target.scrollWidth;
			},

      updateModel: function(event) {
				this.model.set(event.target.name, event.target.value);
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
