(function(){CodeMirror.xmlHints=[],CodeMirror.xmlHint=function(t,n){if(n.length>0){var r=t.getCursor();t.replaceSelection(n),r={line:r.line,ch:r.ch+1},t.setCursor(r)}CodeMirror.simpleHint(t,e)};var e=function(e){var n=e.getCursor();if(n.ch>0){var r=e.getRange({line:0,ch:0},n),i="",s="";for(var o=r.length-1;o>=0;o--){if(r[o]==" "||r[o]=="<"){s=r[o];break}i=r[o]+i}r=r.slice(0,r.length-i.length);var u=t(r)+s,a=CodeMirror.xmlHints[u];if(typeof a=="undefined")a=[""];else{a=a.slice(0);for(var o=a.length-1;o>=0;o--)a[o].indexOf(i)!=0&&a.splice(o,1)}return{list:a,from:{line:n.line,ch:n.ch-i.length},to:n}}},t=function(e){var t="";if(e.length>=0){var r=new RegExp("<([^!?][^\\s/>]*).*?>","g"),i=[],s;while((s=r.exec(e))!=null)i.push({tag:s[1],selfclose:s[0].slice(s[0].length-2)==="/>"});for(var o=i.length-1,u=0;o>=0;o--){var a=i[o];a.tag[0]=="/"?u++:a.selfclose==0&&(u>0?u--:t="<"+a.tag+">"+t)}t+=n(e)}return t},n=function(e){var t=e.lastIndexOf("<"),n=e.lastIndexOf(">");if(n<t){e=e.slice(t);if(e!="<"){var r=e.indexOf(" ");return r<0&&(r=e.indexOf("	")),r<0&&(r=e.indexOf("\n")),r<0&&(r=e.length),e.slice(0,r)}}return""}})();