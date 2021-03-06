
var copy = require('../unit/copy')


module.exports = function Other (context)
{
	return function OTHER ()
	{
		var { $from, $to } = context
		var { other } = context

		var from = other
		.fileset()
		.base($from)
		.view()
		var to = $to()

		return copy({ context, from, to, name: 'other$' })
	}
}
