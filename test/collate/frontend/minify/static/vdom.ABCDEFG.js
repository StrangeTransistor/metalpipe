"use strict";function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){
return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){
var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function _objectSpread(e){
for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach((function(t){_defineProperty(e,t,r[t])
})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){
Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _defineProperty(e,t,r){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,
configurable:!0,writable:!0}):e[t]=r,e}function _toPropertyKey(e){var t=_toPrimitive(e,"string");return"symbol"==_typeof(t)?t:t+""}function _toPrimitive(e,t){
if("object"!=_typeof(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=_typeof(o))return o
;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var index=function(e){function t(e){var t=e.prop;return React.createElement("div",{
className:t})}return e.A=function(){return React.createElement("div",{className:"foo"},"Foo")},e.B=t,e.C=function(e){return React.createElement(React.Fragment,null,React.createElement("div",{
className:"foo"}),React.createElement(t,_objectSpread({prop:"bar"},e)))},e}({});