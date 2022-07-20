
var gulp_pug = require('gulp-pug')


module.exports = function pug ({ $from, exp_opts })
{
	return gulp_pug(
	{
		basedir: $from(),
		locals: exp_opts.as_map(),
	})
}
