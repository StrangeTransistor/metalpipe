

var tick = process.hrtime

var settle    = require('async-done')
var pretty_hr = require('pretty-hrtime')

var is_live = require('./is-live')

var watch_default =
{
	ignoreInitial: false,
	ignorePermissionErrors: true,
}


module.exports = function live (context, glob, task)
{
	task = progress(task)

	if (! is_live(context))
	{
		return task()
	}
	else
	{
		var { $from, $to } = context

		var ignored =
		[
			$to(),
			$from('release'),
			'**/node_modules',
			// $from('web'), // TODO: exclude web // use Ignore()
			// dot(),
		]

		var { watch } = context.gulp
		var options = { ...watch_default, ignored }

		return watch(glob, options /*, task */)
		.on('add', task)
		.on('change', task)
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


function progress (task)
{
	var holistic = (! task.length) /* arguments */

	var task_indicated = (...args) =>
	{
		console.warn('change', args[0])

		var mark = tick()

		return new Promise((rs, rj) =>
		{
			settle(() => task(...args), (error, result) =>
			{
				if (error)
				{
					// TODO: watch_error (-> live_error)
					return rj(error)
				}

				mark = tick(mark)

				console.log('~', task.name, pretty_hr(mark))
				result && console.log(result)

				rs()
			})
		})
	}

	if (holistic)
	{
		task_indicated = debounce(task_indicated, 1000, /* immediate = */ true)
	}

	return task_indicated
}
