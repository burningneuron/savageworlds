CodeMirror.colorize=function(){function t(n,r){if(n.nodeType==3)return r.push(n.nodeValue);for(var i=n.firstChild;i;i=i.nextSibling)t(i,r),e.test(n.nodeType)&&r.push("\n")}var e=/^(p|li|div|h\\d|pre|blockquote|td)$/;return function(e,n){e||(e=document.body.getElementsByTagName("pre"));for(var r=0;r<e.length;++r){var i=e[r],s=i.getAttribute("data-lang")||n;if(!s)continue;var o=[];t(i,o),i.innerHTML="",CodeMirror.runMode(o.join(""),s,i),i.className+=" cm-s-default"}}}();