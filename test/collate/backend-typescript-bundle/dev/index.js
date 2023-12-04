'use strict'

var answer = require('the-answer')

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e } }

var answer__default = /*#__PURE__*/_interopDefaultCompat(answer)

function getDefaultExportFromCjs (x)
{
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x
}

var factory = () => () => {}

const noopFactory = factory

var noop3 = noopFactory()

var noop = /*@__PURE__*/getDefaultExportFromCjs(noop3)

function mod ()
{
	console.log('mod')
}

var mod$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: mod
})

console.log('MOD2')

const custom_opt = 'HASH_0.0.0'
const version = '0.0.0'
const final = false
const dev = true
const test = true
const hash = null
const instance = 'dev'

console.log(noop())

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
console.log({ dev, final, test, hash, instance, version })
console.log(custom_opt)
