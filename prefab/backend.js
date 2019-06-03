
var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/with-package-backend')
var Javascript = require('../pipeline/javascript-external')
var Other = require('../pipeline/other-backend')
var Digest = require('../pipeline/digest')


module.exports = function frontend (context)
{
	context.describe()

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
	'!node_modules/**',
	'!release/**',
	'!web/**',
	'!gulpfile.js',
	'*npm-debug.log',
]
