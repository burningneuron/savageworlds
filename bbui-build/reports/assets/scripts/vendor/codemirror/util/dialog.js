(function(){function e(e,t,n){var r=e.getWrapperElement(),i;return i=r.appendChild(document.createElement("div")),n?i.className="CodeMirror-dialog CodeMirror-dialog-bottom":i.className="CodeMirror-dialog CodeMirror-dialog-top",i.innerHTML=t,i}CodeMirror.defineExtension("openDialog",function(t,n,r){function u(){if(s)return;s=!0,i.parentNode.removeChild(i)}var i=e(this,t,r&&r.bottom),s=!1,o=this,a=i.getElementsByTagName("input")[0],f;if(a)CodeMirror.on(a,"keydown",function(e){if(e.keyCode==13||e.keyCode==27)CodeMirror.e_stop(e),u(),o.focus(),e.keyCode==13&&n(a.value)}),a.focus(),CodeMirror.on(a,"blur",u);else if(f=i.getElementsByTagName("button")[0])CodeMirror.on(f,"click",function(){u(),o.focus()}),f.focus(),CodeMirror.on(f,"blur",u);return u}),CodeMirror.defineExtension("openConfirm",function(t,n,r){function f(){if(o)return;o=!0,i.parentNode.removeChild(i),u.focus()}var i=e(this,t,r&&r.bottom),s=i.getElementsByTagName("button"),o=!1,u=this,a=1;s[0].focus();for(var l=0;l<s.length;++l){var c=s[l];(function(e){CodeMirror.on(c,"click",function(t){CodeMirror.e_preventDefault(t),f(),e&&e(u)})})(n[l]),CodeMirror.on(c,"blur",function(){--a,setTimeout(function(){a<=0&&f()},200)}),CodeMirror.on(c,"focus",function(){++a})}})})();