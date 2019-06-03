// TODO: asset uri rewrite (css, html)

var Clean = require('../pipeline/clean')
var Css = require('../pipeline/css')
var Html = require('../pipeline/html')
var Javascript = require('../pipeline/javascript/bundle')
var Assets = require('../pipeline/assets')
var Serve = require('../pipeline/serve')
var Digest = require('../pipeline/digest')

var get_hash = require('../util/get-hash')


module.exports = function frontend (context)
{
	context.$from = context.$root.partial('lib')

	context.describe()

	context.$to.$static = context.$to.partial('static')

	context.opts.hash = get_hash(context.opts)

	var { series, parallel } = context.gulp

	var clean = Clean(context)
	var css = Css(context)
	var html = Html(context)
	var javascript = Javascript(context)
	var assets = Assets(context)
	var serve = Serve(context)
	var digest = Digest(context)

	return series(
		clean,
		parallel(
			serve,
			css,
			html,
			javascript,
			assets,
			digest,
		)
	)
}
