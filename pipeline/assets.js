// TODO: rehash

var { src } = require('gulp')
var { dest: dst } = require('gulp')

// var concat = require('gulp-concat')
// var guif = require('gulp-if')
// var mpipe = require('multipipe')


// var rehash = require('../unit/rehash')

// var live = require('../util/live')


module.exports = function assets (context)
{
	console.log(assets_plain)
	// return assets_plain(context)
	return assets_bundle(context)
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

function assets_bundle (context)
{
	return function ASSETS_BUNDLE ()
	{
		var { $from, $to } = context

		var from = [ $from('*/assets/**'), $from('!assets/') ]

		console.warn(from)

		return src(from)
		.pipe(debug())
		.pipe(dst($to('assets')))
	}
}

var debug = require('gulp-debug')
