define(["jquery","backbone","text!templates/equipmentDetailView.html","Backbone.Marionette"],function(e,t,n){var r=t.Marionette.ItemView.extend({initialize:function(e){},close:function(){this.remove(),this.unbind()},events:{"change input.equipment":"updateModel","click a.equipment":"deleteModel"},deleteModel:function(){this.model.destroy()},updateModel:function(){this.model.set("name",this.$("[name='name']").val()),this.model.set("weight",this.$("[name='weight']").val())},render:function(){return this.$el.html(_.template(n,this.model.attributes)),this}});return r});