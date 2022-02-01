"use strict";function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}(function(){"use strict";function a(b){var c=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[];return function(){for(var d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];return function(c){return c.length>=b.length?b.apply(void 0,_toConsumableArray(c)):a(b,c)}([].concat(_toConsumableArray(c),e))}}function b(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function d(a){if(x===setTimeout)return setTimeout(a,0);if((x===b||!x)&&setTimeout)return x=setTimeout,setTimeout(a,0);try{return x(a,0)}catch(b){try{return x.call(null,a,0)}catch(b){return x.call(this,a,0)}}}function e(a){if(y===clearTimeout)return clearTimeout(a);if((y===c||!y)&&clearTimeout)return y=clearTimeout,clearTimeout(a);try{return y(a)}catch(b){try{return y.call(null,a)}catch(b){return y.call(this,a)}}}function f(){B&&z&&(B=!1,z.length?A=z.concat(A):C=-1,A.length&&g())}function g(){if(!B){var a=d(f);B=!0;for(var b=A.length;b;){for(z=A,A=[];++C<b;)z&&z[C].run();C=-1,b=A.length}z=null,B=!1,e(a)}}function h(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];A.push(new j(a,b)),1!==A.length||B||d(g)}function j(a,b){this.fun=a,this.array=b}function k(){}function l(a){var b={exports:{}};return a(b,b.exports),b.exports}function m(c,a){if(1===arguments.length){for(var b=c[0],d=1;d<c.length;d++)b=m(b,c[d]);return b}for(var e in a)if("class"==e){var f=c[e]||[];c[e]=(Array.isArray(f)?f:[f]).concat(a[e]||[])}else if("style"===e){var f=q(c[e]);f=f&&";"!==f[f.length-1]?f+";":f;var g=q(a[e]);g=g&&";"!==g[g.length-1]?g+";":g,c[e]=f+g}else c[e]=a[e];return c}function n(a,b){for(var c,d="",e="",f=Array.isArray(b),g=0;g<a.length;g++)c=p(a[g]),c&&(f&&b[g]&&(c=s(c)),d=d+e+c,e=" ");return d}function o(a){var b="",c="";for(var d in a)d&&a[d]&&K.call(a,d)&&(b=b+c+d,c=" ");return b}function p(a,b){return Array.isArray(a)?n(a,b):a&&"object"===_typeof(a)?o(a):a||""}function q(a){if(!a)return"";if("object"===_typeof(a)){var b="";for(var c in a)K.call(a,c)&&(b=b+c+":"+a[c]+";");return b}return a+""}function r(a,b,c,d){if(!1===b||null==b||!b&&("class"===a||"style"===a))return"";if(!0===b)return" "+(d?a:a+"=\""+a+"\"");var e=_typeof(b);return(("object"===e||"function"===e)&&"function"==typeof b.toJSON&&(b=b.toJSON()),"string"!=typeof b&&(b=JSON.stringify(b),!c&&-1!==b.indexOf("\"")))?" "+a+"='"+b.replace(/'/g,"&#39;")+"'":(c&&(b=s(b))," "+a+"=\""+b+"\"")}function s(a){var b=""+a,c=L.exec(b);if(!c)return a;var d,e,f,g="";for(d=c.index,e=0;d<b.length;d++){switch(b.charCodeAt(d)){case 34:f="&quot;";break;case 38:f="&amp;";break;case 60:f="&lt;";break;case 62:f="&gt;";break;default:continue;}e!==d&&(g+=b.substring(e,d)),e=d+1,g+=f}return e===d?g:g+b.substring(e,d)}function t(a,b,c,d){var e=Math.min,f=Math.max;if(!(a instanceof Error))throw a;if(("undefined"!=typeof window||!b)&&!d)throw a.message+=" on line "+c,a;try{d=d||J.readFileSync(b,"utf8")}catch(b){t(a,null,c)}var g=3,h=d.split("\n"),j=f(c-g,0),k=e(h.length,c+g),g=h.slice(j,k).map(function(a,b){var d=b+j+1;return(d==c?"  > ":"    ")+d+"| "+a}).join("\n");throw a.path=b,a.message=(b||"Pug")+":"+c+"\n"+g+"\n\n"+a.message,a}function u(a){var b,c,d,e="";try{var f={};var g=a||{};(function(a,c){e+="<!DOCTYPE html>",e+="<head>",e+="<meta charset=\"utf-8\">",e+="<title>",e+="index</title>",e+="<link rel=\"stylesheet\" href=\"static/index.css\">",e+="<script src=\"static/index.js\"></script></head>",e+="<body>",e+="<div class=\"other some\">",e=e+M.escape(null==(b=c)?"":b)+"</div>",e+="<div class=\"dev\">",e=e+M.escape(null==(b=a)?"":b)+"</div>",a&&(e+="<div class=\"dev\">",e+="Yes</div>"),e+="<div class=\"bg img1\"></div>",e+="<img src=\"static/assets/red.png\">",e+="<div class=\"bg img2\"></div>",e+="<img src=\"static/assets/dir/violet.png\">",e+="<div class=\"bg img3\"></div>",e+="<img src=\"static/assets/index/green.png\">",e+="<div class=\"bg img4\"></div>",e+="<img src=\"static/assets/index/dir/blue.png\">",e+="<a href=\"localhost:8080/static/assets/red.png\"></a></body>"}).call(this,"dev"in g?g.dev:"undefined"==typeof dev?void 0:dev,"other"in g?g.other:"undefined"==typeof other?void 0:other)}catch(a){M.rethrow(a,c,d,f[c])}return e}var v=function factory(){return function(){}}(),w="undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global,x=b,y=c;"function"==typeof w.setTimeout&&(x=setTimeout),"function"==typeof w.clearTimeout&&(y=clearTimeout);var z,A=[],B=!1,C=-1;j.prototype.run=function(){this.fun.apply(null,this.array)};var D=w.performance||{},E=D.now||D.mozNow||D.msNow||D.oNow||D.webkitNow||function(){return new Date().getTime()},F=new Date,G=l(function(a,b){(function(a){function b(a){"}"===a.n.substr(a.n.length-1)&&(a.n=a.n.substring(0,a.n.length-1))}function c(a){return a.trim?a.trim():a.replace(/^\s*|\s*$/g,"")}function d(a,b,c){if(b.charAt(c)!=a.charAt(0))return!1;for(var d=1,e=a.length;d<e;d++)if(b.charAt(c+d)!=a.charAt(d))return!1;return!0}function e(b,c,d,h){var i=[],j=null,k=null,l=null;for(k=d[d.length-1];0<b.length;){if(l=b.shift(),k&&"<"==k.tag&&!(l.tag in v))throw new Error("Illegal content in < super tag.");if(a.tags[l.tag]<=a.tags.$||f(l,h))d.push(l),l.nodes=e(b,l.tag,d,h);else{if("/"==l.tag){if(0===d.length)throw new Error("Closing tag without opener: /"+l.n);if(j=d.pop(),l.n!=j.n&&!g(l.n,j.n,h))throw new Error("Nesting error: "+j.n+" vs. "+l.n);return j.end=l.i,i}"\n"==l.tag&&(l.last=0==b.length||"\n"==b[0].tag)}i.push(l)}if(0<d.length)throw new Error("missing closing tag: "+d.pop().n);return i}function f(a,b){for(var c=0,d=b.length;c<d;c++)if(b[c].o==a.n)return a.tag="#",!0}function g(a,b,c){for(var d=0,e=c.length;d<e;d++)if(c[d].c==a&&c[d].o==b)return!0}function h(a){var b=[];for(var c in a)b.push("\""+j(c)+"\": function(c,p,t,i) {"+a[c]+"}");return"{ "+b.join(",")+" }"}function i(a){var b=[];for(var c in a.partials)b.push("\""+j(c)+"\":{name:\""+j(a.partials[c].name)+"\", "+i(a.partials[c])+"}");return"partials: {"+b.join(",")+"}, subs: "+h(a.subs)}function j(a){return a.replace(r,"\\\\").replace(o,"\\\"").replace(p,"\\n").replace(q,"\\r").replace(t,"\\u2028").replace(u,"\\u2029")}function k(a){return~a.indexOf(".")?"d":"f"}function l(a,b){var c="<"+(b.prefix||""),d=c+a.n+w++;return b.partials[d]={name:a.n,partials:{}},b.code+="t.b(t.rp(\""+j(d)+"\",c,p,\""+(a.indent||"")+"\"));",d}function m(a,b){b.code+="t.b(t.t(t."+k(a.n)+"(\""+j(a.n)+"\",c,p,0)));"}function n(a){return"t.b("+a+");"}var o=/\"/g,p=/\n/g,q=/\r/g,r=/\\/g,t=/\u2028/,u=/\u2029/;a.tags={"#":1,"^":2,"<":3,$:4,"/":5,"!":6,">":7,"=":8,_v:9,"{":10,"&":11,_t:12},a.scan=function(e,f){function g(){0<p.length&&(q.push({tag:"_t",text:new String(p)}),p="")}function h(){for(var b=!0,c=t;c<q.length;c++)if(b=a.tags[q[c].tag]<a.tags._v||"_t"==q[c].tag&&null===q[c].text.match(/\S/),!b)return!1;return b}function j(a,b){if(g(),a&&h())for(var c,d=t;d<q.length;d++)q[d].text&&((c=q[d+1])&&">"==c.tag&&(c.indent=q[d].text.toString()),q.splice(d,1));else b||q.push({tag:"\n"});r=!1,t=q.length}function k(a,b){var d="="+v,e=a.indexOf(d,b),f=c(a.substring(a.indexOf("=",b)+1,e)).split(" ");return u=f[0],v=f[f.length-1],e+d.length-1}var l=e.length,m=0,n=null,o=null,p="",q=[],r=!1,s=0,t=0,u="{{",v="}}";for(f&&(f=f.split(" "),u=f[0],v=f[1]),s=0;s<l;s++)0==m?d(u,e,s)?(--s,g(),m=1):"\n"==e.charAt(s)?j(r):p+=e.charAt(s):1==m?(s+=u.length-1,o=a.tags[e.charAt(s+1)],n=o?e.charAt(s+1):"_v","="==n?(s=k(e,s),m=0):(o&&s++,m=2),r=s):d(v,e,s)?(q.push({tag:n,n:c(p),otag:u,ctag:v,i:"/"==n?r-u.length:s+v.length}),p="",s+=v.length-1,m=0,"{"==n&&("}}"==v?s++:b(q[q.length-1]))):p+=e.charAt(s);return j(r,!0),q};var v={_t:!0,"\n":!0,$:!0,"/":!0};a.stringify=function(b){return"{code: function (c,p,i) { "+a.wrapMain(b.code)+" },"+i(b)+"}"};var w=0;a.generate=function(b,c,d){w=0;var e={code:"",subs:{},partials:{}};return a.walk(b,e),d.asString?this.stringify(e,c,d):this.makeTemplate(e,c,d)},a.wrapMain=function(a){return"var t=this;t.b(i=i||\"\");"+a+"return t.fl();"},a.template=a.Template,a.makeTemplate=function(a,b,c){var d=this.makePartials(a);return d.code=new Function("c","p","i",this.wrapMain(a.code)),new this.template(d,b,this,c)},a.makePartials=function(a){var b,c={subs:{},partials:a.partials,name:a.name};for(b in c.partials)c.partials[b]=this.makePartials(c.partials[b]);for(b in a.subs)c.subs[b]=new Function("c","p","t","i",a.subs[b]);return c},a.codegen={"#":function _(b,c){c.code+="if(t.s(t."+k(b.n)+"(\""+j(b.n)+"\",c,p,1),c,p,0,"+b.i+","+b.end+",\""+b.otag+" "+b.ctag+"\")){t.rs(c,p,function(c,p,t){",a.walk(b.nodes,c),c.code+="});c.pop();}"},"^":function _(b,c){c.code+="if(!t.s(t."+k(b.n)+"(\""+j(b.n)+"\",c,p,1),c,p,1,0,0,\"\")){",a.walk(b.nodes,c),c.code+="};"},">":l,"<":function _(b,c){var d={partials:{},code:"",subs:{},inPartial:!0};a.walk(b.nodes,d);var e=c.partials[l(b,c)];e.subs=d.subs,e.partials=d.partials},$:function $(b,c){var d={subs:{},code:"",partials:c.partials,prefix:b.n};a.walk(b.nodes,d),c.subs[b.n]=d.code,c.inPartial||(c.code+="t.sub(\""+j(b.n)+"\",c,p,i);")},"\n":function _(a,b){b.code+=n("\"\\n\""+(a.last?"":" + i"))},_v:function _v(a,b){b.code+="t.b(t.v(t."+k(a.n)+"(\""+j(a.n)+"\",c,p,0)));"},_t:function _t(a,b){b.code+=n("\""+j(a.text)+"\"")},"{":m,"&":m},a.walk=function(b,c){for(var d,e=0,f=b.length;e<f;e++)d=a.codegen[b[e].tag],d&&d(b[e],c);return c},a.parse=function(a,b,c){return c=c||{},e(a,"",[],c.sectionTags||[])},a.cache={},a.cacheKey=function(a,b){return[a,!!b.asString,!!b.disableLambda,b.delimiters,!!b.modelGet].join("||")},a.compile=function(b,c){c=c||{};var d=a.cacheKey(b,c),e=this.cache[d];if(e){var f=e.partials;for(var g in f)delete f[g].instance;return e}return e=this.generate(this.parse(this.scan(b,c.delimiters),b,c),b,c),this.cache[d]=e}})(b)}),H=l(function(a,b){(function(a){function b(a,b,c){var d;return b&&"object"==_typeof(b)&&(void 0===b[a]?c&&b.get&&"function"==typeof b.get&&(d=b.get(a)):d=b[a]),d}function c(a,b,c,d,e,f){function g(){}function h(){}g.prototype=a,h.prototype=a.subs;var i,j=new g;for(i in j.subs=new h,j.subsText={},j.buf="",d=d||{},j.stackSubs=d,j.subsText=f,b)d[i]||(d[i]=b[i]);for(i in d)j.subs[i]=d[i];for(i in e=e||{},j.stackPartials=e,c)e[i]||(e[i]=c[i]);for(i in e)j.partials[i]=e[i];return j}function d(a){return(null===a||a===void 0?"":a)+""}a.Template=function(a,b,c,d){a=a||{},this.r=a.code||this.r,this.c=c,this.options=d||{},this.text=b||"",this.partials=a.partials||{},this.subs=a.subs||{},this.buf=""},a.Template.prototype={r:function r(){return""},v:function(a){return a=d(a),j.test(a)?a.replace(e,"&amp;").replace(f,"&lt;").replace(g,"&gt;").replace(h,"&#39;").replace(i,"&quot;"):a},t:d,render:function(a,b,c){return this.ri([a],b||{},c)},ri:function ri(a,b,c){return this.r(a,b,c)},ep:function ep(a,b){var d=this.partials[a],e=b[d.name];if(d.instance&&d.base==e)return d.instance;if("string"==typeof e){if(!this.c)throw new Error("No compiler available.");e=this.c.compile(e,this.options)}if(!e)return null;if(this.partials[a].base=e,d.subs){for(key in b.stackText||(b.stackText={}),d.subs)b.stackText[key]||(b.stackText[key]=void 0!==this.activeSub&&b.stackText[this.activeSub]?b.stackText[this.activeSub]:this.text);e=c(e,d.subs,d.partials,this.stackSubs,this.stackPartials,b.stackText)}return this.partials[a].instance=e,e},rp:function rp(a,b,c,d){var e=this.ep(a,c);return e?e.ri(b,c,d):""},rs:function rs(a,b,c){var d=a[a.length-1];if(!k(d))return void c(a,b,this);for(var e=0;e<d.length;e++)a.push(d[e]),c(a,b,this),a.pop()},s:function s(a,b,c,d,e,f,g){var h;return!(k(a)&&0===a.length)&&("function"==typeof a&&(a=this.ms(a,b,c,d,e,f,g)),h=!!a,!d&&h&&b&&b.push("object"==_typeof(a)?a:b[b.length-1]),h)},d:function d(a,c,d,e){var f,g=a.split("."),h=this.f(g[0],c,d,e),j=this.options.modelGet,l=null;if("."===a&&k(c[c.length-2]))h=c[c.length-1];else for(var m=1;m<g.length;m++)f=b(g[m],h,j),void 0===f?h="":(l=h,h=f);return(!e||h)&&(e||"function"!=typeof h||(c.push(l),h=this.mv(h,c,d),c.pop()),h)},f:function f(a,c,d,e){for(var f=!1,g=null,h=!1,j=this.options.modelGet,k=c.length-1;0<=k;k--)if(g=c[k],f=b(a,g,j),void 0!==f){h=!0;break}return h?(e||"function"!=typeof f||(f=this.mv(f,c,d)),f):!e&&""},ls:function ls(a,b,c,e,f){var g=this.options.delimiters;return this.options.delimiters=f,this.b(this.ct(d(a.call(b,e)),b,c)),this.options.delimiters=g,!1},ct:function ct(a,b,c){if(this.options.disableLambda)throw new Error("Lambda features disabled.");return this.c.compile(a,this.options).render(b,c)},b:function b(a){this.buf+=a},fl:function fl(){var a=this.buf;return this.buf="",a},ms:function ms(a,b,c,d,e,f,g){var h,i=b[b.length-1],j=a.call(i);return"function"==typeof j?!!d||(h=this.activeSub&&this.subsText&&this.subsText[this.activeSub]?this.subsText[this.activeSub]:this.text,this.ls(j,i,c,h.substring(e,f),g)):j},mv:function mv(a,b,c){var e=b[b.length-1],f=a.call(e);return"function"==typeof f?this.ct(d(f.call(e)),e,c):f},sub:function sub(a,b,c,d){var e=this.subs[a];e&&(this.activeSub=a,e(b,c,this,d),this.activeSub=!1)}};var e=/&/g,f=/</g,g=/>/g,h=/\'/g,i=/\"/g,j=/[&<>\"\']/,k=Array.isArray||function(b){return"[object Array]"===Object.prototype.toString.call(b)}})(b)});G.Template=H.Template,G.template=G.Template;var I=new G.Template({code:function code(a,b,c){var d=this;return d.b(c=c||""),d.b(d.v(d.f("data",a,b,0))),d.fl()},partials:{},subs:{}}),J={},K=Object.prototype.hasOwnProperty,L=/["&<>]/,M={merge:m,classes:p,style:q,attr:r,attrs:function(a,b){var c="";for(var d in a)if(K.call(a,d)){var e=a[d];if("class"===d){e=p(e),c=r(d,e,!1,b)+c;continue}"style"===d&&(e=q(e)),c+=r(d,e,!1,b)}return c},escape:s,rethrow:t};console.log({yes:"yes"}),console.log("other",function(){return"Other TypeScript"}),console.log("cjs",{cjs:"yes",answer:42,mixed:"foo1"}),console.log("json",{other:"json"}),console.log("answer",42),console.log("noop",v),console.log("curry",a),console.log("global",!!global.global),console.log("process",{nextTick:h,title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:k,addListener:k,once:k,off:k,removeListener:k,removeAllListeners:k,emit:k,binding:function(){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(){throw new Error("process.chdir is not supported")},umask:function(){return 0},hrtime:function(a){var b=Math.floor,c=1e-3*E.call(D),d=b(c),e=b(1e9*(c%1));return a&&(d-=a[0],e-=a[1],0>e&&(d--,e+=1e9)),[d,e]},platform:"browser",release:{},config:{},uptime:function(){var a=new Date;return(a-F)/1e3}}),console.log(I.render({data:"yes"})),console.log("<div>Some Static</div>"),console.log(u({other:"Other",some:"Some"})),console.log("~metalpipe/dev",!1),console.log("production"),console.log("final")})();