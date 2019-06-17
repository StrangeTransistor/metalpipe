
var gulp_less = require('gulp-less')


module.exports = function less ({ $from, opts })
{
	return gulp_less(
	{
		paths: $from(),
		globalVars:
		{
			dev: opts.dev,
		},
	})
}
