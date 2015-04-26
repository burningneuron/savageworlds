(function(){function e(){this.posFrom=this.posTo=this.query=null,this.marked=[]}function t(t){return t._searchState||(t._searchState=new e)}function n(e,t,n){return e.getSearchCursor(t,n,typeof t=="string"&&t==t.toLowerCase())}function r(e,t,n,r){e.openDialog?e.openDialog(t,r):r(prompt(n,""))}function i(e,t,n,r){e.openConfirm?e.openConfirm(t,r):confirm(n)&&r[0]()}function s(e){var t=e.match(/^\/(.*)\/([a-z]*)$/);return t?new RegExp(t[1],t[2].indexOf("i")==-1?"":"i"):e}function u(e,i){var u=t(e);if(u.query)return a(e,i);r(e,o,"Search for:",function(t){e.operation(function(){if(!t||u.query)return;u.query=s(t);if(e.lineCount()<2e3)for(var r=n(e,u.query);r.findNext();)u.marked.push(e.markText(r.from(),r.to(),{className:"CodeMirror-searching"}));u.posFrom=u.posTo=e.getCursor(),a(e,i)})})}function a(e,r){e.operation(function(){var i=t(e),s=n(e,i.query,r?i.posFrom:i.posTo);if(!s.find(r)){s=n(e,i.query,r?{line:e.lineCount()-1}:{line:0,ch:0});if(!s.find(r))return}e.setSelection(s.from(),s.to()),i.posFrom=s.from(),i.posTo=s.to()})}function f(e){e.operation(function(){var n=t(e);if(!n.query)return;n.query=null;for(var r=0;r<n.marked.length;++r)n.marked[r].clear();n.marked.length=0})}function p(e,t){r(e,l,"Replace:",function(o){if(!o)return;o=s(o),r(e,c,"Replace with:",function(r){if(t)e.operation(function(){for(var t=n(e,o);t.findNext();)if(typeof o!="string"){var i=e.getRange(t.from(),t.to()).match(o);t.replace(r.replace(/\$(\d)/,function(e,t){return i[t]}))}else t.replace(r)});else{f(e);var s=n(e,o,e.getCursor());function u(){var t=s.from(),r;if(!(r=s.findNext())){s=n(e,o);if(!(r=s.findNext())||t&&s.from().line==t.line&&s.from().ch==t.ch)return}e.setSelection(s.from(),s.to()),i(e,h,"Replace?",[function(){a(r)},u])}function a(e){s.replace(typeof o=="string"?r:r.replace(/\$(\d)/,function(t,n){return e[n]})),u()}u()}})})}var o='Search: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>',l='Replace: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>',c='With: <input type="text" style="width: 10em"/>',h="Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";CodeMirror.commands.find=function(e){f(e),u(e)},CodeMirror.commands.findNext=u,CodeMirror.commands.findPrev=function(e){u(e,!0)},CodeMirror.commands.clearSearch=f,CodeMirror.commands.replace=p,CodeMirror.commands.replaceAll=function(e){p(e,!0)}})();