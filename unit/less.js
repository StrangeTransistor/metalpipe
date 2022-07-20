
var gulp_less = require('gulp-less')


module.exports = function less ({ $from, exp_opts })
{
	return gulp_less(
	{
		paths: $from(),
		globalVars: exp_opts.as_map(),
	})
}
