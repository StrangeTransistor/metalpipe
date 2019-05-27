
var { watch } = require('gulp')

var is_live = require('./is-live')


module.exports = function live (context, glob, task)
{
	if (! is_live(context))
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
	context.notify.error('ENOSPC, too many watchers', error)
	process.exit()
}
, 100)
