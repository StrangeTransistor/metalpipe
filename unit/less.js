
var gulp_less = require('gulp-less')


module.exports = function less ({ $from })
{
	return gulp_less({ paths: $from() })
}
