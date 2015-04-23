// View.js
// -------
define(["jquery", "backbone", "models/Character", "text!templates/characterListView.html", "views/CharacterSummaryView", "Backbone.Marionette"],

  function($, Backbone, Model, template, CharacterSummaryView) {

    var CharacterListView = Backbone.Marionette.CollectionView.extend({
      childView: CharacterSummaryView,
      // The DOM Element associated with this view
      template: template,

      initialize: function(options) {
        this.childViewOptions = {
          router: options.router
        };
        this.router = options.router;
        this.render();
      },

      close: function() {
        this.remove();
        this.unbind();
      },

    });

    // Returns the CharacterListView class
    return CharacterListView;

  }

);
