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
        this.template = listTemplate;

        this.listView = new ListView({
          childView: EdgeDetailView,
          template: edgeTemplate,
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
        this.listView.collection.add({name: "", effect:""});
      },

      render: function() {
        this.$el.append(_.template(this.template, {}));
        this.$("#edgeTable").append(this.listView.render().$el);

        return this;
      }
    });

    // Returns the View class
    return EdgeListView;
  }
);
