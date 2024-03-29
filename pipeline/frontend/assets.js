
var { src: src$ } = require('gulp')
var { dest: dst } = require('gulp')

var rename = require('../../unit/rename')

var stamp  = require('../../util/hash-stamp')
var fnom   = require('../../util/fnom')
var series = require('../../util/series')
var live   = require('../../util/live')

function src (to)
{
	return src$(to, { follow: true })
}

module.exports = function assets (context)
{
	return function ASSETS ()
	{
		var { $from, $to } = context

		var watch = [ $from('assets/**'), $from('*/assets/**') ]

		var to = $to.$static(stamp(context.opts.hash, 'assets'))

		var task = fnom('assets$', series(
			inert(context),
			assets_plain(context, to),
			assets_bundle(context, to),
		))

		return live(context, watch, task)
	}
}


function inert (context)
{
	var { $from, $to } = context

	return function INERT ()
	{
		return src($from('copy/**'))
		.pipe(dst($to()))
	}
}


function assets_plain (context, to)
{
	return function ASSETS_PLAIN ()
	{
		var { $from } = context

		return src($from('assets/**'))
		.pipe(dst(to))
	}
}


var { sep } = require('path')

function assets_bundle (context, to)
{
	return function ASSETS_BUNDLE ()
	{
		var { $from } = context

		var from = [ $from('*/assets/**'), $from('!assets/') ]

		return src(from)
		.pipe(rename(skip_subdir))
		.pipe(dst(to))

		function skip_subdir (filename)
		{
			filename = $from.relative(filename)

			filename = filename.split(sep)
			filename.splice(1, 1)
			filename = $from(...filename)

			return filename
		}
	}
}
