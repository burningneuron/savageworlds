(function(){function t(t){function c(n,r,i){if(!n.text)return;var s=o?0:n.text.length-1,c=o?n.text.length:-1;i!=null&&(s=i+u);for(;s!=c;s+=u){var h=n.text.charAt(s);if(l.test(h)&&t.getTokenAt({line:r,ch:s+1}).type==a){var p=e[h];if(p.charAt(1)==">"==o)f.push(h);else{if(f.pop()!=p.charAt(0))return{pos:s,match:!1};if(!f.length)return{pos:s,match:!0}}}}}var n=t.getCursor(),r=t.getLineHandle(n.line),i=n.ch-1,s=i>=0&&e[r.text.charAt(i)]||e[r.text.charAt(++i)];if(!s)return null;var o=s.charAt(1)==">",u=o?1:-1,a=t.getTokenAt({line:n.line,ch:i+1}).type,f=[r.text.charAt(i)],l=/[(){}[\]]/;for(var h=n.line,p,d=o?Math.min(h+100,t.lineCount()):Math.max(-1,h-100);h!=d;h+=u){h==n.line?p=c(r,h,i):p=c(t.getLineHandle(h),h);if(p)break}return{from:{line:n.line,ch:i},to:p&&{line:h,ch:p.pos},match:p&&p.match}}function n(e,n){var r=t(e);if(!r)return;var i=r.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket",s=e.markText(r.from,{line:r.from.line,ch:r.from.ch+1},{className:i}),o=r.to&&e.markText(r.to,{line:r.to.line,ch:r.to.ch+1},{className:i}),u=function(){e.operation(function(){s.clear(),o&&o.clear()})};if(!n)return u;setTimeout(u,800)}function i(e){e.operation(function(){r&&(r(),r=null),e.somethingSelected()||(r=n(e,!1))})}var e={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"},r=null;CodeMirror.defineOption("matchBrackets",!1,function(e,t){t?e.on("cursorActivity",i):e.off("cursorActivity",i)}),CodeMirror.defineExtension("matchBrackets",function(){n(this,!0)}),CodeMirror.defineExtension("findMatchingBracket",function(){return t(this)})})();