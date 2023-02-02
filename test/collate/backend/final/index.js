'use strict';

var noop = require('noop3');
var answer = require('the-answer');
var mod = require('./src/mod');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var noop__default = /*#__PURE__*/_interopDefaultCompat(noop);
var answer__default = /*#__PURE__*/_interopDefaultCompat(answer);
var mod__default = /*#__PURE__*/_interopDefaultCompat(mod);

const custom_opt = "HASH_0.0.0";
const version = "0.0.0";
const final = true;
const dev = false;
const test = false;
const hash = null;
const instance = "final";

/*  */

console.log(noop__default.default());

console.log(answer__default.default);

console.log(mod__default.default());

console.log('final');
console.log({ dev, final, test, hash, instance, version });
console.log(custom_opt);
