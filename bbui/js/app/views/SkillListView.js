define(["jquery",
    "backbone",
    "views/ListView",
    "views/SkillDetailView",
    "text!templates/skillListView.html",
    "text!templates/skillDetailView.html",
    "Backbone.Marionette"
  ],
  function($, Backbone, ListView, SkillDetailView, listTemplate, skillTemplate) {
    var SkillListView = Backbone.View.extend({
      initialize: function(options) {
        this.template = listTemplate;

        this.listView = new ListView({
          childView: SkillDetailView,
          template: skillTemplate,
          collection: options.collection
        });

      },

      close: function() {
        this.listView.close();
        this.remove();
        this.unbind();
      },

      events: {
        'click a#addSkill': 'addSkill'
      },

      addSkill: function() {
        this.listView.collection.add({name: "", value:""});
      },

      render: function() {
        this.$el.append(_.template(this.template, {}));
        this.$("#skillTable").append(this.listView.render().$el);

        return this;
      }
    });

    // Returns the View class
    return SkillListView;
  }
);
