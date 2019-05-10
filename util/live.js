
var { watch } = require('gulp')


module.exports = function live (context, glob, task)
{
	var { final, once } = context.opts

	if (final || once)
	{
		return task()
	}
	else
	{
		return watch(glob, { ignoreInitial: false }, task)
	}
}
