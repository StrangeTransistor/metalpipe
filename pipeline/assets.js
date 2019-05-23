// TODO: rehash

var { src } = require('gulp')
var { dest: dst } = require('gulp')

var { series } = require('gulp')

// var concat = require('gulp-concat')
// var guif = require('gulp-if')
// var mpipe = require('multipipe')


var rename = require('../unit/rename')
// var rehash = require('../unit/rehash')

// var live = require('../util/live')


module.exports = function assets (context)
{
	var plain = assets_plain(context)
	var bundle = assets_bundle(context)

	return series(plain, bundle)
}


function assets_plain (context)
{
	return function ASSETS_PLAIN ()
	{
		var { $from, $to } = context

		return src($from('assets/**'))
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
