/* Backbone.validateAll.js - v0.2.0 - 2013-01-23
* http://www.gregfranko.com/Backbone.validateAll.js/
* Copyright (c) 2012 Greg Franko; Licensed MIT */

(function(e,t,n){e.Backbone&&e.Backbone.Model&&e.Backbone.Model.prototype._validate&&(e.Backbone.Model.prototype._validate=function(e,t){if(!t.validate||!this.validate)return!0;t.validateAll!==!1&&(e=_.extend({},this.attributes,e));var n=this.validationError=this.validate(e,t)||null;return n?(this.trigger("invalid",this,n,_.extend(t||{},{validationError:n})),!1):!0})})(window,document);