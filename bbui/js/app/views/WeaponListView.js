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
        this.template = listTemplate;

        this.listView = new ListView({
          childView: WeaponDetailView,
          template: weaponTemplate,
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
        console.log('addWeapon');
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
        this.$el.append(_.template(this.template, {}));
        this.$("#weaponTable").append(this.listView.render().$el);

        return this;
      }
    });

    // Returns the View class
    return WeaponListView;
  }
);
