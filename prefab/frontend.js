// TODO: hash

var { series, parallel } = require('gulp')

var Clean = require('../rule/clean')
var Css = require('../rule/css')
var Html = require('../rule/html')
var JavaScript = require('../rule/javascript')
var Digest = require('../rule/digest')

var get_hash = require('../util/get-hash')
var rehash = require('../util/rehash')


module.exports = function frontend (context)
{
	context.describe()

	context.opts.hash = get_hash(context.opts)

	console.info(rehash('bundle/index.css', 'abcde'))

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
