'use strict'

var answer = require('the-answer')
var mod = require('./src/mod')

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e } }

var answer__default = /*#__PURE__*/_interopDefaultLegacy(answer)
var mod__default = /*#__PURE__*/_interopDefaultLegacy(mod)

console.log(answer__default.default)

console.log(mod__default.default())

function async_import ()
{
	import('./src/mod.js').then(({ default: mod }) => console.log(mod))

	import('the-answer').then(({ default: answer }) => console.log(answer))
}

async_import()

console.log('dev')

console.log('test')

debugger
