// TODO: flat vars ; https://www.npmjs.com/package/flat

var gulp_less = require('gulp-less')


module.exports = function less ({ $from, exp_opts })
{
	var map = { ...exp_opts.as_map() }
	for (var key in map)
	{
		var v = map[key]
		if (typeof v === 'string')
		{
			if (v.indexOf('@') !== -1)
			{
				v = `~'${ v }'`
				map[key] = v
			}
		}
	}

	return gulp_less(
	{
		paths: $from(),
		globalVars: map,
	})
}
