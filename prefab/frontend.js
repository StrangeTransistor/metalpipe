
var { series, parallel } = require('gulp')

var Clean = require('../rule/clean')
var Css = require('../rule/css')
var Html = require('../rule/html')
var JavaScript = require('../rule/javascript')
var Digest = require('../rule/digest')


module.exports = function frontend (context)
{
	context.describe()

	var clean = Clean(context)
	var css = Css(context)
	var html = Html(context)
	var javascript = JavaScript(context)
	var digest = Digest(context)

	return series(
		clean,
		parallel(
			css,
			html,
			javascript,
			digest
		)
	)
}
