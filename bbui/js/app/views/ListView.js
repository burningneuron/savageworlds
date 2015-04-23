// View.js
// -------
define(["jquery",
    "backbone",
    "views/ListItemView",
    "text!templates/skillDetailView.html",
    "Backbone.Marionette"
  ],

  function($, Backbone, ListItemView, template, Marionette) {
    var ListView = Backbone.Marionette.CollectionView.extend({
      childView: ListItemView,
      // The DOM Element associated with this view
      initialize: function(options) {
        this.childViewOptions = {
          template: options.template,
          router: options.router
        };
        this.collection.comparator = 'name';
        this.collection.sort();
        this.router = options.router;
        this.render();
      },

      close: function() {
        this.remove();
        this.unbind();
        return this;
      }

    });

    // Returns the ListView class
    return ListView;

  }

);
