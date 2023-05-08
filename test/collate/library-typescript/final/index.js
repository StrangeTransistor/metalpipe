'use strict';

var answer = require('the-answer');
var mod = require('./src/mod');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var answer__default = /*#__PURE__*/_interopDefaultCompat(answer);
var mod__default = /*#__PURE__*/_interopDefaultCompat(mod);

const custom_opt = "HASH_0.0.0";
const version = "0.0.0";
const final = true;
const dev = false;
const test = false;
const hash = null;
const instance = null;

console.log(answer__default.default);

 

console.log(mod__default.default({ s: true }));

console.log('final');
console.log({ dev, final, test, hash, instance, version });
console.log(custom_opt);
