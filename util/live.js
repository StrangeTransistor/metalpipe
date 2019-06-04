

var is_live = require('./is-live')

var watch_default =
{
	ignoreInitial: false,
	ignorePermissionErrors: true,
}


module.exports = function live (context, glob, task)
{
	var { watch } = context.gulp

	if (! is_live(context))
	{
		return task()
	}
	else
	{
		var { $from, $to } = context

		var ignored =
		[
			// dot(),
			$to(),
			$from('release'),
			$from('node_modules')
		]

		var options = { ...watch_default, ignored }

		return watch(glob, options, task)
		.on('error', watch_error)
	}

	function watch_error (error)
	{
		switch (error.code)
		{
		case 'ENOSPC':
			enospc(task, context, error)
			break

		default:
			context.notify.error(error.message, error)
		}
	}
}


var debounce = require('debounce')

var enospc = debounce((task, context, error) =>
{
	context.notify.error(`ENOSPC, too many watchers (${ task.name })`, error)
	process.exit()
}
, 100)
