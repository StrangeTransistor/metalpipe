
var srv = require('gulp-serve')

var is_live = require('../util/is-live')
var fnom = require('../util/fnom')

var label = 'SERVE'


module.exports = function serve (context)
{
	if (is_live(context))
	{
		var { $to } = context

		return fnom(label, srv(
		{
			port: 8080,
			root: [ $to(), $to.$static(), ],
		}))
	}
	else return fnom(label, async () => {})
}
