
var { join } = require('path')

var sourcemaps = require('gulp-sourcemaps')

var fallback = require('../util/get-fallback')

var nothing = require('./nothing')

module.exports = function (context)
{
	var so = fallback(context.opts, 'maps', (opts) =>
	{
		return (! opts.final)
	})

	var path_delta_rev = context.$from.relative(context.$root)

	if (so)
	{
		var maps = { ...sourcemaps, tidy_tree }

		return maps
	}
	else
	{
		return empty
	}

	function tidy_tree (fn)
	{
		return maps.mapSources(path =>
		{
			path = fn(path)
			path = join(path_delta_rev, path)
			return path
		})
	}
}

var empty =
{
	init:  nothing,
	tidy_tree: nothing,
	write: nothing,
}
