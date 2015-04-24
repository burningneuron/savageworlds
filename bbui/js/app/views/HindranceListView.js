define(["jquery",
    "backbone",
    "views/ListView",
    "views/HindranceDetailView",
    "text!templates/hindranceListView.html",
    "text!templates/hindranceDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, HindranceDetailView, listTemplate, hindranceTemplate) {
    var HindranceListView = Backbone.View.extend({
      initialize: function(options) {
        this.router = options.router;
        this.template = listTemplate;

        this.listView = new ListView({
          childView: HindranceDetailView,
          template: hindranceTemplate,
          router: this.router,
          collection: options.collection
        });

      },

      close: function() {
        this.listView.close();
        this.remove();
        this.unbind();
      },

      events: {
        'click a#addHindrance': 'addHindrance'
      },

      addHindrance: function() {
        this.listView.collection.add({name: "", effect:""});
      },

      render: function() {
        this.$el.html(this.listView.render().$el);
        this.$el.append(_.template(this.template, {}));

        return this;
      }
    });

    // Returns the View class
    return HindranceListView;
  }
);
