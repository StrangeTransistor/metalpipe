'use strict';

var answer = require('the-answer');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var answer__default = /*#__PURE__*/_interopDefaultCompat(answer);

function mod ()
{
	console.log('mod');
}

var mod$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: mod
});

console.log(answer__default.default);

console.log(mod());

function async_import ()
{
	Promise.resolve().then(function () { return mod$1; }).then(({ default: mod }) => console.log(mod));

	import('the-answer').then(({ default: answer }) => console.log(answer));
}

async_import();

console.log('final');
