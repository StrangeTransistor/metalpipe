
var Clean = require('../pipeline/clean')
var Javascript = require('../pipeline/javascript-external')
var Digest = require('../pipeline/digest')
// TODO: Other


module.exports = function frontend (context)
{
	context.describe()

	var { series, parallel } = context.gulp

	var clean = Clean(context)
	var javascript = Javascript(context)
	var digest = Digest(context)

	return series(
		clean,
		parallel(
			javascript,
			digest
		)
	)
}
