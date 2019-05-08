
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var { parallel } = require('gulp')


var pug = require('../unit/pug')

var live = require('../util/live')

var copy = require('./copy')


module.exports = function html (fromto)
{
	return parallel(html_pug(fromto), html_static(fromto))
}

function html_pug ({ $from, $to })
{
	return function PUG ()
	{
		return live($from('**/*.pug'), function pug$ ()
		{
			return src($from('index/*.pug'))
			.pipe(pug({ $from }))
			.pipe(dst($to()))
		})
	}
}

function html_static ({ $from, $to })
{
	return function HTML_STATIC ()
	{
		return copy(
		{
			name: 'html_static$',
			from: $from('index/*.htm?(l)'),
			to:   $to(),
		})
	}
}
