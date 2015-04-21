// Collection.js
// -------------
define(["jquery", "backbone", "models/Character", "Backbone.DocumentModel"],

  function($, Backbone, Character) {

    // Creates a new Backbone Collection class object
    var CharacterCollection = Backbone.DocumentCollection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Character

    });

    // Returns the Model class
    return CharacterCollection;

  }

);
