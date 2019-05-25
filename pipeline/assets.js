// TODO: rehash

var { src } = require('gulp')
var { dest: dst } = require('gulp')


var rename = require('../unit/rename')
// var rehash = require('../unit/rehash')

var series = require('../util/series')
var live = require('../util/live')


module.exports = function assets (context)
{
	return function ASSETS ()
	{
		var { $from } = context

		var watch = [ $from('assets/**'), $from('*/assets/**') ]

		return live(context, watch, series(
				assets_plain(context),
				assets_bundle(context)
			)
		)
	}
}


function assets_plain (context)
{
	return function ASSETS_PLAIN ()
	{
		var { $from, $to } = context

		return src($from('assets/**'))
		.pipe(debug())
		.pipe(dst($to('assets')))
	}
}


var { sep }  = require('path')
var { join } = require('path')

function assets_bundle (context)
{
	return function ASSETS_BUNDLE ()
	{
		var { $from, $to } = context

		var from = [ $from('*/assets/**'), $from('!assets/') ]

		return src(from)
		.pipe(rename(skip_subdir))
		.pipe(debug())
		.pipe(dst($to('assets')))

		function skip_subdir (filename)
		{
			filename = $from.relative(filename)

			filename = filename.split(sep)
			filename.splice(1, 1)
			filename = join(...filename)

			filename = $from(filename)

			return filename
		}
	}
}


var debug = require('gulp-debug')
