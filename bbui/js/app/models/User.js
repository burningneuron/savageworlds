define(["jquery", "backbone", "Backbone.DocumentModel"],

  function($, Backbone) {

    // Creates a new Backbone Model class object
    var User = Backbone.DocumentModel.extend({
      idAttribute: '_id',
      urlRoot: '/api/user',

      // Model Constructor
      initialize: function() {
        this.on('change:twitter.* change:facebook.* change:google.*', function() {
          this.trigger('change');
        }.bind(this));
      },

      // Default values for all of the Model attributes
      defaults: {
        facebook: {},
        twitter: {},
        google: {}
      },

      // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
      validate: function(attrs) {

      }

    });

    // Returns the Model class
    return User;

  }

);
