// View.js
// -------
define(["jquery",
    "backbone",
    "Backbone.Marionette"
  ],

  function($, Backbone, Marionette) {
    var ListView = Backbone.Marionette.CollectionView.extend({

      initialize: function(options) {
        this.childView = options.childView;
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
