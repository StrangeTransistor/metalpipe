
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
}

function watch_error (error)
{
	switch (error.code)
	{
	case 'ENOSPC':
		console.error('ENOSPC, to many watchers')
		break
	}

	console.error(error)
}
