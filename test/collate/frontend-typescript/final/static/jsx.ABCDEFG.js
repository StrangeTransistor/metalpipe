"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (React) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var React__default = _interopDefaultLegacy(React);

  function Foo() {
    return React__default["default"].createElement('div', {
      class: "foo"
    });
  }

  function App() {
    return React__default["default"].createElement('div', {
      class: "app"
    }, React__default["default"].createElement(Foo, null));
  }

  console.log(React__default["default"].createElement(App, null));
  console.log('final');
})(React);