"use strict";function o(o){return o&&"object"==typeof o&&"default"in o?o:{default:o}}var e=o(require("the-answer"));var l=(()=>()=>{})();function n(){console.log("mod")}var t=Object.freeze({
__proto__:null,default:n});console.log("MOD2");console.log(l()),console.log(e.default),console.log(n()),Promise.resolve().then((function(){return t})).then((({default:o})=>console.log(o))),
import("the-answer").then((({default:o})=>console.log(o))),console.log("final"),console.log({dev:!1,final:!0,test:!1,hash:null,instance:"final",version:"0.0.0"}),console.log("HASH_0.0.0");
