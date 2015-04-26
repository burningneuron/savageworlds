// DesktopRouter.js
// ----------------
define(["jquery",
		"backbone",
		"collections/CharacterCollection",
		"models/User",
		"models/Character",
		"views/CharacterListView",
		"views/LoginView",
		"views/ProfileView",
		"views/AboutView",
		"Backbone.Marionette",
		"savageworlds/models/Character",
		"savageworlds/display/views/CharacterDetailView",
		"savageworlds/edit/views/CharacterDetailView",
	],

	function($, Backbone, CharacterCollection, UserModel, CharacterModel, CharacterListView,
		LoginView, ProfileView, AboutView, Marionette, SavageWorldsCharacterModel,
			SavageWorldsCharacterDisplay, SavageWorldsCharacterEditor) {

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
        "addCharacter": "addCharacter",
				"characters": "listCharacters",
        "character?id=:id": "character",
				"profile": "profile",

			},

			showView: function(view) {
				if (this.currentView && this.currentView.close) {
					this.currentView.close();
				} else if (this.currentView) {
					this.currentView.remove();
				}

				this.currentView = view;
				$("#pageContent").html(this.currentView.el);
				this.currentView.render();

			},

			index: function() {
				this.showView(new AboutView({
					router: this
				}));
			},

			listCharacters: function() {
				var characters = new CharacterCollection();
				characters.fetch();

				this.showView(new CharacterListView({
					router: this,
					collection: characters
				}));
			},

			profile: function() {
				this.showView(new ProfileView({
					router: this,
					model: this.user
				}));
      },

			addCharacter: function() {
        var character = new SavageWorldsCharacterModel();
				// seems necessary to ensure defaults are fully constructed when view is created
				character.set(CharacterModel.defaults);

        this.showView(new SavageWorldsCharacterEditor({
          router: this,
          model: character
        }));
			},

			character: function(id) {
				var character = new SavageWorldsCharacterModel({
					_id: id
				});
				character.fetch({
					success: function(model, response, callback) {
						this.showView(new SavageWorldsCharacterEditor({
							router: this,
							model: model
						}));
					}.bind(this)
				});

			}

		});

		// Returns the DesktopRouter class
		return DesktopRouter;

	}

);
