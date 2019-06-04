
var { basename } = require('path')

var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/backend/with-package')
var Javascript = require('../pipeline/javascript/single')
var Other = require('../pipeline/backend/other')
var Digest = require('../pipeline/digest')

var fallback = require('../util/get-fallback')


module.exports = function frontend (context)
{
	context.describe()

	context.instance = fallback(context.opts, 'instance', () =>
	{
		return basename(context.$to())
	})

	var { series, parallel } = context.gulp

	var clean = Clean(context)
	var pkg = WithPackage(context)
	var javascript = Javascript(context, { ignore })
	var other = Other(context, { ignore })
	var digest = Digest(context)

	return series(
		clean,
		parallel(
			pkg,
			javascript,
			other,
			digest
		)
	)
}


var ignore =
[
	'!package.json',
	'!node_modules/**',
	'!release/**',
	'!gulpfile.js',

	'!web/**',

	'!*npm-debug.log',
	'!coverage/**',
	'!flow-typed/**',
]
