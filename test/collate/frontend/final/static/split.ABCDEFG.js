"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  'use strict';

  function curry(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function () {
      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      return function (rest) {
        return rest.length >= fn.length ? fn.apply(void 0, _toConsumableArray(rest)) : curry(fn, rest);
      }([].concat(_toConsumableArray(args), _args));
    };
  }

  var split = curry(function () {
    console.log('Split');
  });
  split();
})();