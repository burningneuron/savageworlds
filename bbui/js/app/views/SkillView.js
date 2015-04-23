define(["jquery",
    "backbone",
    "views/ListView",
    "text!templates/skillListView.html",
    "text!templates/skillDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, listTemplate, itemTemplate) {
    var SkillView = Backbone.View.extend({
      initialize: function(options) {
        this.router = options.router;
        this.template = listTemplate;
        // Calls the view's render method
        this.listView = new ListView({
          template: itemTemplate,
          router: this.router,
          collection: options.collection
        });

        // this.listenTo(this.model, 'change', this.render);
        this.render();
      },

      close: function() {
        this.remove();
        this.unbind();
      },

      events: {},

      render: function() {
        this.$el.html(this.listView.render().el);
        this.$el.append(_.template(this.template, {}));
        return this;
      }
    });

    // Returns the View class
    return SkillView;
  }
);
