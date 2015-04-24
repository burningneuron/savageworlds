define(["jquery",
    "backbone",
    "views/ListView",
    "views/WeaponDetailView",
    "text!templates/weaponListView.html",
    "text!templates/weaponDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, WeaponDetailView, listTemplate, weaponTemplate) {
    var WeaponListView = Backbone.View.extend({
      initialize: function(options) {
        this.router = options.router;
        this.template = listTemplate;

        this.listView = new ListView({
          childView: WeaponDetailView,
          template: weaponTemplate,
          router: this.router,
          collection: options.collection
        });

      },

      close: function() {
        this.listView.close();
        this.remove();
        this.unbind();
      },

      events: {
        'click a#addWeapon': 'addWeapon'
      },

      addWeapon: function() {
        this.listView.collection.add({
          name: "",
          range: "",
          damage: "",
          rof: "",
          weight: "",
          shots: "",
          min_str: "",
          notes: ""
        });
      },

      render: function() {
        this.$el.html(this.listView.render().$el);
        this.$el.append(_.template(this.template, {}));

        return this;
      }
    });

    // Returns the View class
    return WeaponListView;
  }
);
