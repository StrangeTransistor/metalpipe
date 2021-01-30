"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var index = function (exports) {
  'use strict';

  function A() {
    return React.createElement('div', {
      className: "foo"
    }, "Foo");
  }

  function B(_ref) {
    var prop = _ref.prop;
    return React.createElement('div', {
      className: prop
    });
  }

  function C(props) {
    return React.createElement(React.Fragment, null, React.createElement('div', {
      className: "foo"
    }), React.createElement(B, _objectSpread({
      prop: 'bar'
    }, props)));
  }

  exports.A = A;
  exports.B = B;
  exports.C = C;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  return exports;
}({});