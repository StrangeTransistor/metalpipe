
var srv = require('gulp-serve')


module.exports = function serve ({ $to })
{
	return srv(
	{
		port: 8080,
		root: [ $to(), $to.$static(), ],
	})
}
