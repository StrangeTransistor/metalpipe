
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
		.on('error', watch_error)
	}

	function watch_error (error)
	{
		switch (error.code)
		{
		case 'ENOSPC':
			enospc(context, error)
			break

		default:
			context.notify.error(error)
		}
	}
}


var debounce = require('debounce')

var enospc = debounce((context, error) =>
{
	context.notify('ENOSPC, too many watchers')
	console.error(error)
}
, 100)
