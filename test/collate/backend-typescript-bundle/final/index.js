'use strict';

var answer = require('the-answer');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var answer__default = /*#__PURE__*/_interopDefaultCompat(answer);

var factory = () => () => {};

const noopFactory = factory;

var noop3 = noopFactory();

function mod ()
{
	console.log('mod');
}

var mod$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: mod
});

const custom_opt = "HASH_0.0.0";
const version = "0.0.0";
const final = true;
const dev = false;
const test = false;
const hash = null;
const instance = "final";

console.log(noop3());

console.log(answer__default.default);

console.log(mod());

function async_import ()
{
	Promise.resolve().then(function () { return mod$1; }).then(({ default: mod }) => console.log(mod));

	import('the-answer').then(({ default: answer }) => console.log(answer));
}

async_import();

console.log('final');
console.log({ dev, final, test, hash, instance, version });
console.log(custom_opt);
