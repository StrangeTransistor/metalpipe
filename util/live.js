
var { watch } = require('gulp')


var is_final = require('./is-final')
var is_once  = require('./is-once')


module.exports = function live (glob, task)
{
	if (is_final() || is_once())
	{
		return task()
	}
	else
	{
		return watch(glob, { ignoreInitial: false }, task)
	}
}
