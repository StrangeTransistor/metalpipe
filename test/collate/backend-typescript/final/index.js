'use strict';

var answer = require('the-answer');
var mod = require('./src/mod');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var answer__default = /*#__PURE__*/_interopDefaultCompat(answer);
var mod__default = /*#__PURE__*/_interopDefaultCompat(mod);

console.log(answer__default.default);

console.log(mod__default.default());

function async_import ()
{
	import('./src/mod.js').then(({ default: mod }) => console.log(mod));

	import('the-answer').then(({ default: answer }) => console.log(answer));
}

async_import();

console.log('final');
