
var gulp_pug = require('gulp-pug')


module.exports = function pug ({ $from, opts })
{
	return gulp_pug(
	{
		basedir: $from(),
		locals:
		{
			dev: opts.dev,
		},
	})
}
