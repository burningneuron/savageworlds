define(["jquery","backbone","models/Character","text!templates/characterDetailView.html","views/SkillListView","views/EdgeListView","views/HindranceListView","views/WeaponListView","views/PowerListView","views/EquipmentListView","views/AdvancementView"],function(e,t,n,r,i,s,o,u,a,f,l){var c=t.View.extend({initialize:function(e){this.editMode=!1,this.router=e.router,this.subviews=[],this.addSubView(i,"skills"),this.addSubView(f,"equipment"),this.addSubView(s,"edges"),this.addSubView(o,"hindrances"),this.addSubView(u,"weapons"),this.addSubView(a,"powers"),this.addSubView(l,"advancement",!0),this.listenTo(this.model,"change",this.render),this.hideAndShowControls()},addSubView:function(e,t,n){n?this.subviews.push({view:new e({model:this.model.get("gameStuff."+t)}),anchor:"#"+t}):this.subviews.push({view:new e({collection:this.model.get("gameStuff."+t)}),anchor:"#"+t})},close:function(){this.subviews.forEach(function(e){e.view.close()}.bind(this)),this.remove(),this.unbind()},events:{"change input.base":"updateModel","click a#save":"save","click a#saveAndClose":"saveAndClose","click a#displayMode":"switchModes","click a#editMode":"switchModes"},hideAndShowControls:function(){var t=".displayMode",n=".editMode";this.editMode&&(n=[t,t=n][0]),e(t).removeClass("hidden"),e(t).addClass("show"),e(n).removeClass("show"),e(n).addClass("hidden")},switchModes:function(){this.editMode=!this.editMode,this.hideAndShowControls()},updateModel:function(){this.model.set("setting",this.$("[name='setting']").val()),this.model.set("player",this.$("[name='player']").val()),this.model.set("name",this.$("[name='name']").val()),this.model.set("gameStuff.race",this.$("[name='race']").val()),this.model.set("gameStuff.rank",this.$("[name='rank']").val()),this.model.set("gameStuff.xp",this.$("[name='xp']").val()),this.model.set("gameStuff.money",this.$("[name='money']").val()),this.model.set("gameStuff.agility",this.$("[name='agility']").val()),this.model.set("gameStuff.smarts",this.$("[name='smarts']").val()),this.model.set("gameStuff.spirit",this.$("[name='spirit']").val()),this.model.set("gameStuff.strength",this.$("[name='strength']").val()),this.model.set("gameStuff.vigor",this.$("[name='vigor']").val()),this.model.set("gameStuff.charisma",this.$("[name='charisma']").val()),this.model.set("gameStuff.pace",this.$("[name='pace']").val()),this.model.set("gameStuff.parry",this.$("[name='parry']").val()),this.model.set("gameStuff.toughness",this.$("[name='toughness']").val())},save:function(){this.model.save(null,{success:function(){console.log("model save successful")}.bind(this),failure:function(){console.log("model save failed")}.bind(this)})},saveAndClose:function(){var e=this.router;this.model.save(null,{success:function(){console.log("model save successful"),e.navigate("characters",!0)},failure:function(){console.log("model save failed")}})},render:function(){return this.$el.html(_.template(r,this.model.toJSON())),this.subviews.forEach(function(e){e.view.$el=this.$(e.anchor),e.view.render(),e.view.delegateEvents()}.bind(this)),this}});return c});