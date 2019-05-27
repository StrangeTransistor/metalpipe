
var notifier = require('node-notifier')


module.exports = function Notify ()
{
	function notify (message)
	{
		notifier.notify({ title: 'metalpipe', message })
		console.info(message)
	}

	notify.error = function error (message, error)
	{
		message || (message = error.message)

		notifier.notify({ title: 'metalpipe: Error', message })
		console.error(error)
	}

	notify.process = function process (name)
	{
		var fail = 0

		function error (error)
		{
			notify.error(`${ name }: Error\n${ error.message }`, error)

			fail = 2
		}

		function stable ()
		{
			if (fail === 1)
			{
				notify(`${ name }: OK`)
			}

			if (fail) fail--
		}

		return { error, stable }
	}

	return notify
}
