'use strict'

var noop = require('noop3')
var answer = require('the-answer')

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e } }

var noop__default = /*#__PURE__*/_interopDefaultCompat(noop)
var answer__default = /*#__PURE__*/_interopDefaultCompat(answer)

function mod ()
{
	console.log('mod')
}

var mod$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: mod
})

console.log(noop__default.default())

console.log(answer__default.default)

console.log(mod())

function async_import ()
{
	Promise.resolve().then(() => { return mod$1 }).then(({ default: mod }) => console.log(mod))

	import('the-answer').then(({ default: answer }) => console.log(answer))
}

async_import()

console.log('dev')

console.log('test')

debugger
