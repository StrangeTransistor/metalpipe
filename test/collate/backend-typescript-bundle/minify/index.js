"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=e(require("the-answer"));function l(e){
return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var n=l((()=>()=>{})());function t(){console.log("mod")}var r=Object.freeze({__proto__:null,default:t})
;console.log("MOD2");console.log(n()),console.log(o.default),console.log(t()),Promise.resolve().then((function(){return r})).then((({default:e})=>console.log(e))),
import("the-answer").then((({default:e})=>console.log(e))),console.log("final"),console.log({dev:!1,final:!0,test:!1,hash:null,instance:"final",version:"0.0.0"}),console.log("HASH_0.0.0");
