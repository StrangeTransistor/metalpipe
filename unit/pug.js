
var gulp_pug = require('gulp-pug')


module.exports = function pug ({ $from })
{
	return gulp_pug({ basedir: $from() })
}
