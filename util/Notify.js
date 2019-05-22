
var notifier = require('node-notifier')


module.exports = function Notify ()
{
	function notify (message)
	{
		notifier.notify({ title: 'metalpipe', message })
		console.info(message)
	}

	notify.error = function error (error)
	{
		notifier.notify({ title: 'metalpipe: Error', message: error.message })
		console.error(error)
	}

	return notify
}
