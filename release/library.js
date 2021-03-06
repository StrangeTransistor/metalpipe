
var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/library/with-package')
var Javascript = require('../pipeline/javascript/single')
var Typings = require('../pipeline/javascript/typings')
var Other = require('../pipeline/other')

var is_typescript = require('../pipeline/javascript/is-typescript')


module.exports = function frontend (context)
{
	context.typescript = is_typescript(context)

	context.describe()

	var { series, parallel } = context.gulp

	var clean = Clean(context)

	var pkg = WithPackage(context)
	var dts = Typings(context)
	var javascript = Javascript(context)

	var other = Other(context)

	return series(
		clean,
		parallel(
			pkg,
			dts,
			javascript,
			other
		),
	)
}
