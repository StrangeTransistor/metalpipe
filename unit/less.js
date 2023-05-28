/* eslint complexity: [ 1, 6 ] */

var delimiter = '__'

var gulp_less = require('gulp-less')
var flat = require('flat')


module.exports = function less ({ $from, exp_opts })
{
	var map = { ...exp_opts.as_map() }

	for (var key in map)
	{
		var v = map[key]

		if (Object(v) === v)
		{
			var vmap = flat(v, { delimiter })
			for (var key_flat in vmap)
			{
				map[key + delimiter + key_flat] = vmap[key_flat]
			}

			delete map[key]
		}
	}

	for (var key in map)
	{
		var v = map[key]

		if (typeof v === 'string')
		{
			/* treat all strings literally */
			v = `~'${ v }'`
			map[key] = v
		}
	}

	return gulp_less(
	{
		paths: $from(),
		globalVars: map,
	})
}
