
var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/library/with-package')
var Javascript = require('../pipeline/javascript/single')
var Other = require('../pipeline/backend/other')
// var Digest = require('../pipeline/digest')


module.exports = function frontend (context)
{
	context.describe()

	var { series, parallel } = context.gulp

	var clean = Clean(context)
	var pkg = WithPackage(context)
	var javascript = Javascript(context, { ignore })
	var other = Other(context, { ignore })
	// var digest = Digest(context)

	return series(
		clean,
		parallel(
			pkg,
			javascript,
			other
			// digest
		)
	)
}

var ignore =
[
	'!package.json',
	'!node_modules/**',
	'!release/**',
	'!gulpfile.js',

	// '!web/**',

	'!*npm-debug.log',
	'!coverage/**',
	'!flow-typed/**',
]
