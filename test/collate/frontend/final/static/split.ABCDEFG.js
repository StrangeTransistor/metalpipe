"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
(function () {
  'use strict';

  /**
   * taken from the last comment of https://gist.github.com/mkuklis/5294248
   * Returns a curried equivalent of the provided function. The curried function
   * has two unusual capabilities. First, its arguments needn't be provided one
   * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
   * following are equivalent:
   *
   *   - `g(1)(2)(3)`
   *   - `g(1)(2, 3)`
   *   - `g(1, 2)(3)`
   *   - `g(1, 2, 3)`
   *
   * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
   * "gaps", allowing partial application of any combination of arguments,
   * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
   * the following are equivalent:
   *
   *   - `g(1, 2, 3)`
   *   - `g(_, 2, 3)(1)`
   *   - `g(_, _, 3)(1)(2)`
   *   - `g(_, _, 3)(1, 2)`
   *   - `g(_, 2)(1)(3)`
   *   - `g(_, 2)(1, 3)`
   *   - `g(_, 2)(_, 3)(1)`
   *
   * @func
   * @category Function
   * @sig (* -> a) -> (* -> a)
   * @param {Function} fn The function to curry.
   * @return {Function} A new, curried function.
   * @example
   *
   *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
   *
   *      const curriedAddFourNumbers = R.curry(addFourNumbers);
   *      const f = curriedAddFourNumbers(1, 2);
   *      const g = f(3);
   *      g(4); //=> 10
   */
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