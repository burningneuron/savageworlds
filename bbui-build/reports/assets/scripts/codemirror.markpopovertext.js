(function(){function e(e){e=e||5;var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*n.length));return t}CodeMirror.prototype.markPopoverText=function(t,n,r,i,s){var o=new RegExp("("+n+")","g"),u=this.getSearchCursor(o,t),a,f="plato-mark-"+e(10);while(a=u.findNext()){if(u.to().line!==t.line)break;this.markText({line:t.line,ch:u.from().ch},{line:t.line,ch:u.to().ch},{className:"plato-mark "+f+" "+(r||""),startStyle:"plato-mark-start",endStyle:"plato-mark-end"})}return i&&this.setGutterMarker(t.line,i.gutterId,i.el),function(){var e=$(".plato-mark-start."+f),n=$("."+f);if(s.type==="popover"){var r=!1;n.add(i.el).on("mouseenter touchstart",function(t){t.preventDefault(),r=!0,n.addClass("active"),e.popover("show")}).on("mouseleave touchend",function(t){t.preventDefault(),n.removeClass("active"),r=!1,setTimeout(function(){r||e.popover("hide")},200)}),e.popover({trigger:"manual",content:s.content,html:!0,title:s.title,placement:"top"})}else s.type==="block"&&this.addLineWidget(t.line,$(s.content)[0])}}})();