
var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/with-package-backend')
var Javascript = require('../pipeline/javascript-external')
var Digest = require('../pipeline/digest')
// TODO: Other


module.exports = function frontend (context)
{
	context.describe()

	var { series, parallel } = context.gulp

	var clean = Clean(context)
	var pkg = WithPackage(context)
	var javascript = Javascript(context, { ignore })
	var digest = Digest(context)

	return series(
		clean,
		parallel(
			pkg,
			javascript,
			digest
		)
	)
}


var ignore =
[
	'!node_modules/**',
	'!release/**',
	'*npm-debug.log',
]
