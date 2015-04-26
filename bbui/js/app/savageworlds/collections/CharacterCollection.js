// Collection.js
// -------------
define(["jquery", "backbone", "savageworlds/models/Character", "Backbone.DocumentModel"],

  function($, Backbone, Character) {

    // Creates a new Backbone Collection class object
    var CharacterCollection = Backbone.DocumentCollection.extend({
      url: '/api/character',
      // Tells the Backbone Collection that all of it's models will be of type Character (listed up top as a dependency)
      model: Character

    });

    // Returns the Model class
    return CharacterCollection;

  }

);
