define(["jquery","backbone","text!templates/hindranceDetailView.html","Backbone.Marionette"],function(e,t,n){var r=t.Marionette.ItemView.extend({initialize:function(e){this.listenTo(this.model,"change",this.render)},close:function(){this.remove(),this.unbind()},events:{"change input.hindrance":"updateModel","click a.hindrance":"deleteModel"},deleteModel:function(){this.model.destroy()},updateModel:function(e){this.model.set("name",this.$("[name='name']").val()),this.model.set("effect",this.$("[name='effect']").val())},render:function(){return this.$el.html(_.template(n,this.model.attributes)),this}});return r});