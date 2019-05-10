
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var { parallel } = require('gulp')


var pug = require('../unit/pug')

var live = require('../util/live')

var copy = require('./copy')


module.exports = function html (context)
{
	return parallel(html_pug(context), html_static(context))
}

function html_pug (context)
{
	return function PUG ()
	{
		var { $from, $to } = context

		return live(context, $from('**/*.pug'), function pug$ ()
		{
			return src($from('index/*.pug'))
			.pipe(pug({ $from }))
			.pipe(dst($to()))
		})
	}
}

function html_static (context)
{
	var { $from, $to } = context

	return function HTML_STATIC ()
	{
		return copy(
		{
			name: 'html_static$',
			context,
			from: $from('index/*.htm?(l)'),
			to:   $to(),
		})
	}
}
