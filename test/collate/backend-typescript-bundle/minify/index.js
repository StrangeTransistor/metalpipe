"use strict";var answer=require("the-answer");function _interopDefaultCompat(a){return a&&"object"==typeof a&&"default"in a?a:{default:a}}var answer__default=_interopDefaultCompat(answer),factory=()=>()=>{};const noopFactory=factory;var noop3=noopFactory();function mod(){console.log("mod")}var mod$1=Object.freeze({__proto__:null,default:mod});console.log(noop3()),console.log(answer__default.default),console.log(mod());function async_import(){Promise.resolve().then(function(){return mod$1}).then(({default:a})=>console.log(a)),import("the-answer").then(({default:a})=>console.log(a))}async_import(),console.log("final");