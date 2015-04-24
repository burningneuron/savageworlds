define(["jquery",
    "backbone",
    "views/ListView",
    "views/EdgeDetailView",
    "text!templates/edgeListView.html",
    "text!templates/edgeDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, EdgeDetailView, listTemplate, edgeTemplate) {
    var EdgeListView = Backbone.View.extend({
      initialize: function(options) {
        this.router = options.router;
        this.template = listTemplate;

        this.listView = new ListView({
          childView: EdgeDetailView,
          template: edgeTemplate,
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
        'click a#addEdge': 'addEdge'
      },

      addEdge: function() {
        console.log('addEdge');
      },

      render: function() {
        this.$el.html(this.listView.render().$el);
        this.$el.append(_.template(this.template, {}));

        return this;
      }
    });

    // Returns the View class
    return EdgeListView;
  }
);
