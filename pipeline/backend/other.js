
var copy = require('../../unit/copy')


module.exports = function Other (context, options = {})
{
	return function OTHER ()
	{
		var { $from, $to } = context
		var { ignore } = options

		var from =
		[
			'**/*',
			...ignore.view(),
		]
		.map(glob => $from(glob))

		return copy(
		{
			context,
			from,
			to: $to(),
			name: 'other$',
		})
	}
}
