define(["jquery","backbone","models/User","text!templates/loginView.html"],function(e,t,n,r){var i=t.View.extend({el:".login",initialize:function(e){this.router=e.router,this.listenTo(this.model,"change",this.render),this.render()},close:function(){this.remove(),this.unbind()},events:{"click #facebookbutton":"gotoProfile","click #twitterbutton":"gotoProfile","click #googlebutton":"gotoProfile","click a.about":"gotoAbout","click a.characterList":"gotoCharacterList"},gotoProfile:function(){this.router.navigate("profile",!0)},gotoAbout:function(){this.router.navigate("",!0)},gotoCharacterList:function(){this.router.navigate("characters",!0)},render:function(){return this.$el.html(_.template(r,this.model.toJSON())),this}});return i});