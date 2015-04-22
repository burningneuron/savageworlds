// View.js
// -------
define(["jquery", "backbone", "models/Character", "text!templates/characterListView.html", "views/CharacterSummaryView", "Backbone.Marionette"],

  function($, Backbone, Model, template, CharacterSummaryView) {

    var CharacterListView = Backbone.Marionette.CollectionView.extend({
      childView: CharacterSummaryView,
      // The DOM Element associated with this view
      el: "#pageContent",
      template: template,

      initialize: function() {
        this.render();
      },

    });

    // Returns the CharacterListView class
    return CharacterListView;

  }

);
