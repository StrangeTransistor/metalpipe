"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (React) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var React__default = _interopDefaultLegacy(React);

  function Foo() {
    return React__default['default'].createElement('div', {
      class: "foo"
    });
  }

  function App() {
    return React__default['default'].createElement('div', {
      class: "app"
    }, React__default['default'].createElement(Foo, null));
  }

  console.log(React__default['default'].createElement(App, null));
})(React);