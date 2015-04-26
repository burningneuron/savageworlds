define(["jquery",
    "backbone",
    "views/ListView",
    "savageworlds/edit/views/EdgeDetailView",
    "text!savageworlds/edit/templates/edgeListView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, EdgeDetailView, template) {
    var EdgeListView = Backbone.View.extend({
      initialize: function(options) {
        this.listView = new ListView({
          childView: EdgeDetailView,
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
        this.listView.collection.add({
          name: "",
          effect: ""
        });
      },

      render: function() {
        this.$el.append(_.template(template, {}));
        this.$("#edgeTable").append(this.listView.render().$el);

        return this;
      }
    });

    // Returns the View class
    return EdgeListView;
  }
);
