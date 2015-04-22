// View.js
// -------
define(["jquery", "backbone", "models/Character", "text!templates/characterListView.html", "views/CharacterSummaryView", "Backbone.Marionette"],

  function($, Backbone, Model, template, CharacterSummaryView) {

    var CharacterListView = Backbone.Marionette.CollectionView.extend({
      childView: CharacterSummaryView,
      // The DOM Element associated with this view
      el: "#characterList",
      template: template,

      initialize: function() {
        console.log('CharacterListView: initialize');
        this.render();
      },
      onRender: function() {
        console.log('CharacterListView: onRender')
      },
      onShow: function() {
        console.log('CharacterListView: onShow')
      }

    });

    // Returns the CharacterListView class
    return CharacterListView;

  }

);
