define(["jquery",
    "backbone",
    "views/ListView",
    "views/EquipmentDetailView",
    "text!templates/equipmentListView.html",
    "text!templates/equipmentDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, EquipmentDetailView, listTemplate, equipmentTemplate) {
    var EquipmentListView = Backbone.View.extend({
      initialize: function(options) {
        this.template = listTemplate;

        this.listView = new ListView({
          childView: EquipmentDetailView,
          template: equipmentTemplate,
          collection: options.collection
        });

      },

      close: function() {
        this.listView.close();
        this.remove();
        this.unbind();
      },

      events: {
        'click a#addEquipment': 'addEquipment'
      },

      addEquipment: function() {
        this.listView.collection.add({name: "", value:""});
      },

      render: function() {
        this.$el.append(_.template(this.template, {}));
        this.$("#equipmentTable").append(this.listView.render().$el);

        return this;
      }
    });

    // Returns the View class
    return EquipmentListView;
  }
);
