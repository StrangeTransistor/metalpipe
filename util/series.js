
module.exports = function series (...tasks)
{
	return next(tasks)

	function next (tasks)
	{
		return (/* value */) =>
		{
			if (! tasks.length) return Promise.resolve()

			var task = tasks[0]
			tasks = tasks.slice(1)

			return capture(task).then(next(tasks))
		}
	}
}


var eos = require('end-of-stream')

function capture (task)
{
	return new Promise((rs, rj) =>
	{
		eos(task(), e => (e && rj(e) || rs()))
	})
}
