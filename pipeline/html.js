
var { src } = require('gulp')
var { dest: dst } = require('gulp')


var pug = require('../unit/pug')
var min = require('../unit/htmlmin')

var live = require('../util/live')


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

		var pr = context.notify.process('PUG')

		return live(context, $from('**/*.pug'), function pug$ ()
		{
			return src($from('index/*.pug'))
			.pipe(pug(context))

			.on('error', pr.error).on('end', pr.stable)
			.on('error', pr.error.end)

			.pipe(min())
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
			.pipe(min())
			.pipe(dst($to()))
		})
	}
}
