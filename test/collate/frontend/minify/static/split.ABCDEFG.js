"use strict";function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||_unsupportedIterableToArray(r)||_nonIterableSpread()}function _nonIterableSpread(){
throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}
function _unsupportedIterableToArray(r,t){if(r){if("string"==typeof r)return _arrayLikeToArray(r,t);var e={}.toString.call(r).slice(8,-1)
;return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?_arrayLikeToArray(r,t):void 0}
}function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}function _arrayWithoutHoles(r){
if(Array.isArray(r))return _arrayLikeToArray(r)}function _arrayLikeToArray(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=Array(t);e<t;e++)n[e]=r[e];return n}!function(){
var r=function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return function(){for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o]
;return(i=[].concat(_toConsumableArray(e),a)).length>=t.length?t.apply(void 0,_toConsumableArray(i)):r(t,i);var i}}((function(){console.log("Split")}));r()}();