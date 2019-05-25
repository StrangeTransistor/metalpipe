
var srv = require('gulp-serve')

var is_live = require('../util/is-live')


module.exports = function serve (context)
{
	if (is_live(context))
	{
		var { $to } = context

		return srv(
		{
			port: 8080,
			root: [ $to(), $to.$static(), ],
		})
	}
	else return async () => {}
}
