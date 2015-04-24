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
        this.router = options.router;
        this.template = listTemplate;

        this.listView = new ListView({
          childView: SkillDetailView,
          template: skillTemplate,
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
        'click a#addSkill': 'addSkill'
      },

      addSkill: function() {
        console.log('addSkill');
      },

      render: function() {
        this.$el.html(this.listView.render().$el);
        this.$el.append(_.template(this.template, {}));

        return this;
      }
    });

    // Returns the View class
    return SkillListView;
  }
);
