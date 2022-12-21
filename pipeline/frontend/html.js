// TODO: inline-resources html (web-resource-inliner)

var { src } = require('gulp')
var { dest: dst } = require('gulp')


var pug = require('../../unit/pug')
var min = require('../../unit/htmlmin')

var posthtml = require('gulp-posthtml')
var rebase   = require('posthtml-urls')

var in_uri = require('../../util/hash-stamp').in_uri


var live = require('../../util/live')


module.exports = function html (context)
{
	var { parallel } = context.gulp

	return parallel(html_pug(context), html_static(context))
}

function html_pug (context)
{
	return function PUG ()
	{
		var { $from, $to } = context

		var pr  = context.notify.process('PUG')
		var prh = context.notify.process('HTML-MIN')

		return live(context, $from('**/*.pug'), function pug$ ()
		{
			return src($from('index/*.pug'))

			.pipe(pug(context))
			.on('error', pr.error).on('end', pr.stable)
			.on('error', pr.error.end)

			.pipe(rewrite_uri(context))

			.pipe(min())
			.on('error', prh.error).on('end', prh.stable)
			.on('error', prh.error.end)

			.pipe(dst($to()))
		})
	}
}

function html_static (context)
{
	var { $from, $to } = context

	var from = $from('index/*.htm?(l)')

	return function HTML_STATIC ()
	{
		return live(context, from, function html_static$ ()
		{
			return src(from)
			.pipe(rewrite_uri(context))
			.pipe(min())
			.pipe(dst($to()))
		})
	}
}

function rewrite_uri (context)
{
	var hash = context.opts.hash
	var stamp = in_uri(hash)

	return posthtml(
	[
		rebase({ eachURL: stamp })
	])
}
