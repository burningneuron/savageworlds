// DesktopRouter.js
// ----------------
define(["jquery",
    "backbone",
    "models/User",
    "views/LoginView",
    "collections/Collection",
    "models/Character",
    "views/CharacterListView"
  ],

  function($, Backbone, UserModel, LoginView, Collection, Character, CharacterListView) {

    var DesktopRouter = Backbone.Router.extend({

      initialize: function() {

        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();

      },

      // All of your Backbone Routes (add more)
      routes: {

        // When there is no hash on the url, the home method is called
        "": "index"

      },

      index: function() {
        var user = new UserModel();
        user.fetch();

        // Instantiates a new view which will render the header text to the page
        new LoginView({
          model: user
        });

        new CharacterListView({
          model: new Character()
        });
      }

    });

    // Returns the DesktopRouter class
    return DesktopRouter;

  }

);
