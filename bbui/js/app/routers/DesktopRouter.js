// DesktopRouter.js
// ----------------
define(["jquery",
    "backbone",
    "collections/CharacterCollection",
    "models/User",
    "models/Character",
    "views/CharacterDetailView",
    "views/CharacterListView",
    "views/LoginView",
    "views/ProfileView",
    "Backbone.Marionette",
  ],

  function($, Backbone, CharacterCollection, UserModel, CharacterModel,
    CharacterDetailView, CharacterListView, LoginView, ProfileView, Marionette) {

    var DesktopRouter = Backbone.Router.extend({

      initialize: function() {

        this.user = new UserModel();
        this.user.fetch();

        // Instantiates a new view which will render the header text to the page
        this.loginView = new LoginView({
          router: this,
          model: this.user
        });

        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();
      },

      // All of your Backbone Routes (add more)
      routes: {

        // When there is no hash on the url, the home method is called
        "": "index",
        "character?id=:id": "character",
        "profile": "profile"

      },

      showView: function(view) {
        if (this.currentView){
          this.currentView.close ? this.currentView.close() : this.currentView.remove();
        }

        this.currentView = view;
        $("#pageContent").html(this.currentView.el);
        this.currentView.render();

      },

      index: function() {
        var characters = new CharacterCollection();
        characters.fetch();

        this.showView(new CharacterListView({
          collection: characters
        }));
      },

      profile: function() {
        this.showView(new ProfileView({model: this.user}));
      },

      character: function(id) {
        var character = new CharacterModel({
          id: id
        });
        character.fetch();

        this.showView(new CharacterDetailView({
          model: character
        }));
      }

    });

    // Returns the DesktopRouter class
    return DesktopRouter;

  }

);
