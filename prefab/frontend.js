
var { parallel } = require('gulp')

var Css = require('../rule/css')
var Html = require('../rule/html')
var JavaScript = require('../rule/javascript')
var Digest = require('../rule/digest')


module.exports = function frontend (context)
{
	context.describe()

	var css = Css(context)
	var html = Html(context)
	var javascript = JavaScript(context)
	var digest = Digest(context)

	return parallel(css, html, javascript, digest)
}
