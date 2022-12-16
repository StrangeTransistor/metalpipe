"use strict";function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}!function(){var t="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e=function(){return function(){}}();var n={cjs:"yes",answer:42,mixed:"foo1"},r={other:"json"};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}var a=i,s=o;function c(t){if(a===setTimeout)return setTimeout(t,0);if((a===i||!a)&&setTimeout)return a=setTimeout,setTimeout(t,0);try{return a(t,0)}catch(e){try{return a.call(null,t,0)}catch(e){return a.call(this,t,0)}}}"function"==typeof t.setTimeout&&(a=setTimeout),"function"==typeof t.clearTimeout&&(s=clearTimeout);var l,u=[],f=!1,h=-1;function p(){f&&l&&(f=!1,l.length?u=l.concat(u):h=-1,u.length&&d())}function d(){if(!f){var t=c(p);f=!0;for(var e=u.length;e;){for(l=u,u=[];++h<e;)l&&l[h].run();h=-1,e=u.length}l=null,f=!1,function(t){if(s===clearTimeout)return clearTimeout(t);if((s===o||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(t);try{s(t)}catch(e){try{return s.call(null,t)}catch(e){return s.call(this,t)}}}(t)}}function g(t,e){this.fun=t,this.array=e}g.prototype.run=function(){this.fun.apply(null,this.array)};function v(){}var b=v,m=v,y=v,w=v,T=v,A=v,k=v;var x=t.performance||{},S=x.now||x.mozNow||x.msNow||x.oNow||x.webkitNow||function(){return(new Date).getTime()};var _=new Date;var j={nextTick:function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new g(t,e)),1!==u.length||f||c(d)},title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:b,addListener:m,once:y,off:w,removeListener:T,removeAllListeners:A,emit:k,binding:function(t){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(t){throw new Error("process.chdir is not supported")},umask:function(){return 0},hrtime:function(t){var e=.001*S.call(x),n=Math.floor(e),r=Math.floor(e%1*1e9);return t&&(n-=t[0],(r-=t[1])<0&&(n--,r+=1e9)),[n,r]},platform:"browser",release:{},config:{},uptime:function(){return(new Date-_)/1e3}},E={};(function(t){var e=/\S/,n=/\"/g,r=/\n/g,i=/\r/g,o=/\\/g,a=/\u2028/,s=/\u2029/;function c(t){return t.trim?t.trim():t.replace(/^\s*|\s*$/g,"")}function l(t,e,n){if(e.charAt(n)!=t.charAt(0))return!1;for(var r=1,i=t.length;r<i;r++)if(e.charAt(n+r)!=t.charAt(r))return!1;return!0}t.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},t.scan=function(n,r){var i,o=n.length,a=0,s=null,u=null,f="",h=[],p=!1,d=0,g=0,v="{{",b="}}";function m(){f.length>0&&(h.push({tag:"_t",text:new String(f)}),f="")}function y(n,r){if(m(),n&&function(){for(var n=!0,r=g;r<h.length;r++)if(!(n=t.tags[h[r].tag]<t.tags._v||"_t"==h[r].tag&&null===h[r].text.match(e)))return!1;return n}())for(var i,o=g;o<h.length;o++)h[o].text&&((i=h[o+1])&&">"==i.tag&&(i.indent=h[o].text.toString()),h.splice(o,1));else r||h.push({tag:"\n"});p=!1,g=h.length}function w(t,e){var n="="+b,r=t.indexOf(n,e),i=c(t.substring(t.indexOf("=",e)+1,r)).split(" ");return v=i[0],b=i[i.length-1],r+n.length-1}for(r&&(r=r.split(" "),v=r[0],b=r[1]),d=0;d<o;d++)0==a?l(v,n,d)?(--d,m(),a=1):"\n"==n.charAt(d)?y(p):f+=n.charAt(d):1==a?(d+=v.length-1,"="==(s=(u=t.tags[n.charAt(d+1)])?n.charAt(d+1):"_v")?(d=w(n,d),a=0):(u&&d++,a=2),p=d):l(b,n,d)?(h.push({tag:s,n:c(f),otag:v,ctag:b,i:"/"==s?p-v.length:d+b.length}),f="",d+=b.length-1,a=0,"{"==s&&("}}"==b?d++:"}"===(i=h[h.length-1]).n.substr(i.n.length-1)&&(i.n=i.n.substring(0,i.n.length-1)))):f+=n.charAt(d);return y(p,!0),h};var u={_t:!0,"\n":!0,$:!0,"/":!0};function f(e,n,r,i){var o,a=[],s=null,c=null;for(o=r[r.length-1];e.length>0;){if(c=e.shift(),o&&"<"==o.tag&&!(c.tag in u))throw new Error("Illegal content in < super tag.");if(t.tags[c.tag]<=t.tags.$||h(c,i))r.push(c),c.nodes=f(e,c.tag,r,i);else{if("/"==c.tag){if(0===r.length)throw new Error("Closing tag without opener: /"+c.n);if(s=r.pop(),c.n!=s.n&&!p(c.n,s.n,i))throw new Error("Nesting error: "+s.n+" vs. "+c.n);return s.end=c.i,a}"\n"==c.tag&&(c.last=0==e.length||"\n"==e[0].tag)}a.push(c)}if(r.length>0)throw new Error("missing closing tag: "+r.pop().n);return a}function h(t,e){for(var n=0,r=e.length;n<r;n++)if(e[n].o==t.n)return t.tag="#",!0}function p(t,e,n){for(var r=0,i=n.length;r<i;r++)if(n[r].c==t&&n[r].o==e)return!0}function d(t){var e=[];for(var n in t.partials)e.push('"'+v(n)+'":{name:"'+v(t.partials[n].name)+'", '+d(t.partials[n])+"}");return"partials: {"+e.join(",")+"}, subs: "+function(t){var e=[];for(var n in t)e.push('"'+v(n)+'": function(c,p,t,i) {'+t[n]+"}");return"{ "+e.join(",")+" }"}(t.subs)}t.stringify=function(e,n,r){return"{code: function (c,p,i) { "+t.wrapMain(e.code)+" },"+d(e)+"}"};var g=0;function v(t){return t.replace(o,"\\\\").replace(n,'\\"').replace(r,"\\n").replace(i,"\\r").replace(a,"\\u2028").replace(s,"\\u2029")}function b(t){return~t.indexOf(".")?"d":"f"}function m(t,e){var n="<"+(e.prefix||"")+t.n+g++;return e.partials[n]={name:t.n,partials:{}},e.code+='t.b(t.rp("'+v(n)+'",c,p,"'+(t.indent||"")+'"));',n}function y(t,e){e.code+="t.b(t.t(t."+b(t.n)+'("'+v(t.n)+'",c,p,0)));'}function w(t){return"t.b("+t+");"}t.generate=function(e,n,r){g=0;var i={code:"",subs:{},partials:{}};return t.walk(e,i),r.asString?this.stringify(i,n,r):this.makeTemplate(i,n,r)},t.wrapMain=function(t){return'var t=this;t.b(i=i||"");'+t+"return t.fl();"},t.template=t.Template,t.makeTemplate=function(t,e,n){var r=this.makePartials(t);return r.code=new Function("c","p","i",this.wrapMain(t.code)),new this.template(r,e,this,n)},t.makePartials=function(t){var e,n={subs:{},partials:t.partials,name:t.name};for(e in n.partials)n.partials[e]=this.makePartials(n.partials[e]);for(e in t.subs)n.subs[e]=new Function("c","p","t","i",t.subs[e]);return n},t.codegen={"#":function(e,n){n.code+="if(t.s(t."+b(e.n)+'("'+v(e.n)+'",c,p,1),c,p,0,'+e.i+","+e.end+',"'+e.otag+" "+e.ctag+'")){t.rs(c,p,function(c,p,t){',t.walk(e.nodes,n),n.code+="});c.pop();}"},"^":function(e,n){n.code+="if(!t.s(t."+b(e.n)+'("'+v(e.n)+'",c,p,1),c,p,1,0,0,"")){',t.walk(e.nodes,n),n.code+="};"},">":m,"<":function(e,n){var r={partials:{},code:"",subs:{},inPartial:!0};t.walk(e.nodes,r);var i=n.partials[m(e,n)];i.subs=r.subs,i.partials=r.partials},$:function(e,n){var r={subs:{},code:"",partials:n.partials,prefix:e.n};t.walk(e.nodes,r),n.subs[e.n]=r.code,n.inPartial||(n.code+='t.sub("'+v(e.n)+'",c,p,i);')},"\n":function(t,e){e.code+=w('"\\n"'+(t.last?"":" + i"))},_v:function(t,e){e.code+="t.b(t.v(t."+b(t.n)+'("'+v(t.n)+'",c,p,0)));'},_t:function(t,e){e.code+=w('"'+v(t.text)+'"')},"{":y,"&":y},t.walk=function(e,n){for(var r,i=0,o=e.length;i<o;i++)(r=t.codegen[e[i].tag])&&r(e[i],n);return n},t.parse=function(t,e,n){return f(t,0,[],(n=n||{}).sectionTags||[])},t.cache={},t.cacheKey=function(t,e){return[t,!!e.asString,!!e.disableLambda,e.delimiters,!!e.modelGet].join("||")},t.compile=function(e,n){n=n||{};var r=t.cacheKey(e,n),i=this.cache[r];if(i){var o=i.partials;for(var a in o)delete o[a].instance;return i}return i=this.generate(this.parse(this.scan(e,n.delimiters),e,n),e,n),this.cache[r]=i}})(E);var O={};!function(t){!function(t){function e(t,e,n){var r;return e&&"object"==_typeof(e)&&(void 0!==e[t]?r=e[t]:n&&e.get&&"function"==typeof e.get&&(r=e.get(t))),r}t.Template=function(t,e,n,r){t=t||{},this.r=t.code||this.r,this.c=n,this.options=r||{},this.text=e||"",this.partials=t.partials||{},this.subs=t.subs||{},this.buf=""},t.Template.prototype={r:function(t,e,n){return""},v:function(t){return t=c(t),s.test(t)?t.replace(n,"&amp;").replace(r,"&lt;").replace(i,"&gt;").replace(o,"&#39;").replace(a,"&quot;"):t},t:c,render:function(t,e,n){return this.ri([t],e||{},n)},ri:function(t,e,n){return this.r(t,e,n)},ep:function(t,e){var n=this.partials[t],r=e[n.name];if(n.instance&&n.base==r)return n.instance;if("string"==typeof r){if(!this.c)throw new Error("No compiler available.");r=this.c.compile(r,this.options)}if(!r)return null;if(this.partials[t].base=r,n.subs){for(key in e.stackText||(e.stackText={}),n.subs)e.stackText[key]||(e.stackText[key]=void 0!==this.activeSub&&e.stackText[this.activeSub]?e.stackText[this.activeSub]:this.text);r=function(t,e,n,r,i,o){function a(){}function s(){}var c;a.prototype=t,s.prototype=t.subs;var l=new a;for(c in l.subs=new s,l.subsText={},l.buf="",r=r||{},l.stackSubs=r,l.subsText=o,e)r[c]||(r[c]=e[c]);for(c in r)l.subs[c]=r[c];for(c in i=i||{},l.stackPartials=i,n)i[c]||(i[c]=n[c]);for(c in i)l.partials[c]=i[c];return l}(r,n.subs,n.partials,this.stackSubs,this.stackPartials,e.stackText)}return this.partials[t].instance=r,r},rp:function(t,e,n,r){var i=this.ep(t,n);return i?i.ri(e,n,r):""},rs:function(t,e,n){var r=t[t.length-1];if(l(r))for(var i=0;i<r.length;i++)t.push(r[i]),n(t,e,this),t.pop();else n(t,e,this)},s:function(t,e,n,r,i,o,a){var s;return(!l(t)||0!==t.length)&&("function"==typeof t&&(t=this.ms(t,e,n,r,i,o,a)),s=!!t,!r&&s&&e&&e.push("object"==_typeof(t)?t:e[e.length-1]),s)},d:function(t,n,r,i){var o,a=t.split("."),s=this.f(a[0],n,r,i),c=this.options.modelGet,u=null;if("."===t&&l(n[n.length-2]))s=n[n.length-1];else for(var f=1;f<a.length;f++)void 0!==(o=e(a[f],s,c))?(u=s,s=o):s="";return!(i&&!s)&&(i||"function"!=typeof s||(n.push(u),s=this.mv(s,n,r),n.pop()),s)},f:function(t,n,r,i){for(var o=!1,a=!1,s=this.options.modelGet,c=n.length-1;c>=0;c--)if(void 0!==(o=e(t,n[c],s))){a=!0;break}return a?(i||"function"!=typeof o||(o=this.mv(o,n,r)),o):!i&&""},ls:function(t,e,n,r,i){var o=this.options.delimiters;return this.options.delimiters=i,this.b(this.ct(c(t.call(e,r)),e,n)),this.options.delimiters=o,!1},ct:function(t,e,n){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(t,this.options).render(e,n)},b:function(t){this.buf+=t},fl:function(){var t=this.buf;return this.buf="",t},ms:function(t,e,n,r,i,o,a){var s,c=e[e.length-1],l=t.call(c);return"function"==typeof l?!!r||(s=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(l,c,n,s.substring(i,o),a)):l},mv:function(t,e,n){var r=e[e.length-1],i=t.call(r);return"function"==typeof i?this.ct(c(i.call(r)),r,n):i},sub:function(t,e,n,r){var i=this.subs[t];i&&(this.activeSub=t,i(e,n,this,r),this.activeSub=!1)}};var n=/&/g,r=/</g,i=/>/g,o=/\'/g,a=/\"/g,s=/[&<>\"\']/;function c(t){return String(null==t?"":t)}var l=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}}(t)}(O);var L=E;L.Template=O.Template,L.template=L.Template;var P=new L.Template({code:function(t,e,n){var r=this;return r.b(n=n||""),r.b(r.v(r.f("data",t,e,0))),r.fl()},partials:{},subs:{}}),C={},N={},I=Object.prototype.hasOwnProperty;function M(t,e){return Array.isArray(t)?function(t,e){for(var n,r="",i="",o=Array.isArray(e),a=0;a<t.length;a++)(n=M(t[a]))&&(o&&e[a]&&(n=G(n)),r=r+i+n,i=" ");return r}(t,e):t&&"object"===_typeof(t)?function(t){var e="",n="";for(var r in t)r&&t[r]&&I.call(t,r)&&(e=e+n+r,n=" ");return e}(t):t||""}function D(t){if(!t)return"";if("object"===_typeof(t)){var e="";for(var n in t)I.call(t,n)&&(e=e+n+":"+t[n]+";");return e}return t+""}function $(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var i=_typeof(e);return"object"!==i&&"function"!==i||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=G(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}C.merge=function t(e,n){if(1===arguments.length){for(var r=e[0],i=1;i<e.length;i++)r=t(r,e[i]);return r}for(var o in n)if("class"===o){var a=e[o]||[];e[o]=(Array.isArray(a)?a:[a]).concat(n[o]||[])}else if("style"===o){a=(a=D(e[o]))&&";"!==a[a.length-1]?a+";":a;var s=D(n[o]);s=s&&";"!==s[s.length-1]?s+";":s,e[o]=a+s}else e[o]=n[o];return e},C.classes=M,C.style=D,C.attr=$,C.attrs=function(t,e){var n="";for(var r in t)if(I.call(t,r)){var i=t[r];if("class"===r){n=$(r,i=M(i),!1,e)+n;continue}"style"===r&&(i=D(i)),n+=$(r,i,!1,e)}return n};var F=/["&<>]/;function G(t){var e=""+t,n=F.exec(e);if(!n)return t;var r,i,o,a="";for(r=n.index,i=0;r<e.length;r++){switch(e.charCodeAt(r)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 60:o="&lt;";break;case 62:o="&gt;";break;default:continue}i!==r&&(a+=e.substring(i,r)),i=r+1,a+=o}return i!==r?a+e.substring(i,r):a}C.escape=G,C.rethrow=function t(e,n,r,i){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||i))throw e.message+=" on line "+r,e;try{i=i||N.readFileSync(n,"utf8")}catch(n){t(e,null,r)}var o=3,a=i.split("\n"),s=Math.max(r-o,0),c=Math.min(a.length,r+o);o=a.slice(s,c).map((function(t,e){var n=e+s+1;return(n==r?"  > ":"    ")+n+"| "+t})).join("\n");throw e.path=n,e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message,e},console.log("answer",42),console.log("noop",e),console.log("curry",(function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return function(){for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=[].concat(_toConsumableArray(n),i)).length>=e.length?e.apply(void 0,_toConsumableArray(a)):t(e,a);var a}})),console.log((function(){return"Other"})),console.log(n),console.log(r),console.log(!1),console.log({final:!0,test:!1,hash:"ABCDEFG",instance:null}),console.log("production"),console.log(!!t.global),console.log(j);console.log({yes:"yes"}),console.log(P.render({data:"yes"})),console.log('<div>Some Static</div><div class="dev">false</div><div class="test">false</div><div class="final">true</div><div class="hash">ABCDEFG</div><div class="instance"></div>'),console.log(function(t){var e,n,r="";try{var i={},o=t||{};(function(t,n,i,o,a,s,c){r+="<!DOCTYPE html>",r+="<head>",r+='<meta charset="utf-8">',r+="<title>",r+="index</title>",r+='<link rel="stylesheet" href="static/index.css">',r+='<script src="static/index.js"><\/script></head>',r+="<body>",r=(r+='<div class="some">')+C.escape(null==(e=s)?"":e)+"</div>",r=(r+='<div class="other some">')+C.escape(null==(e=a)?"":e)+"</div>",r=(r+='<div class="dev">')+C.escape(null==(e=t)?"":e)+"</div>",r=(r+='<div class="test">')+C.escape(null==(e=c)?"":e)+"</div>",r=(r+='<div class="final">')+C.escape(null==(e=n)?"":e)+"</div>",r=(r+='<div class="hash">')+C.escape(null==(e=i)?"":e)+"</div>",r=(r+='<div class="instance">')+C.escape(null==(e=o)?"":e)+"</div>",t&&(r+='<div class="dev">',r+="Yes</div>"),r+='<div class="bg img1"></div>',r+='<img src="static/assets/red.png">',r+='<div class="bg img2"></div>',r+='<img src="static/assets/dir/violet.png">',r+='<div class="bg img3"></div>',r+='<img src="static/assets/index/green.png">',r+='<div class="bg img4"></div>',r+='<img src="static/assets/index/dir/blue.png">',r+='<a href="localhost:8080/static/assets/red.png"></a></body>'}).call(this,"dev"in o?o.dev:"undefined"!=typeof dev?dev:void 0,"final"in o?o.final:"undefined"!=typeof final?final:void 0,"hash"in o?o.hash:"undefined"!=typeof hash?hash:void 0,"instance"in o?o.instance:"undefined"!=typeof instance?instance:void 0,"other"in o?o.other:"undefined"!=typeof other?other:void 0,"some"in o?o.some:"undefined"!=typeof some?some:void 0,"test"in o?o.test:"undefined"!=typeof test?test:void 0)}catch(t){C.rethrow(t,n,undefined,i[void 0])}return r}({other:"Other",some:"Some"})),console.log("final")}();