define(["jquery",
    "backbone",
    "views/ListView",
    "views/PowerDetailView",
    "text!templates/powerListView.html",
    "text!templates/powerDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, PowerDetailView, listTemplate, powerTemplate) {
    var PowerListView = Backbone.View.extend({
      initialize: function(options) {
        this.router = options.router;
        this.template = listTemplate;

        this.listView = new ListView({
          childView: PowerDetailView,
          template: powerTemplate,
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
        'click a#addPower': 'addPower'
      },

      addPower: function() {
        console.log('addPower');
        this.listView.collection.add({
          power_points: "",
          name: "",
          trappings: "",
          effect: "",
          duration: "",
          notes: ""
        });
      },

      render: function() {
        this.$el.append(_.template(this.template, {}));
        this.$("#powerTable").append(this.listView.render().$el);

        return this;
      }
    });

    // Returns the View class
    return PowerListView;
  }
);
