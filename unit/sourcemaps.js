
var sourcemaps = require('gulp-sourcemaps')

var fallback = require('../util/get-fallback')

var nothing = require('./nothing')

module.exports = function (context)
{
	var so = fallback(context.opts, 'maps', (opts) =>
	{
		return (! opts.final)
	})

	if (so)
	{
		return sourcemaps
	}
	else
	{
		return empty
	}
}

var empty =
{
	init:  nothing,
	mapSources: nothing,
	write: nothing,
}
