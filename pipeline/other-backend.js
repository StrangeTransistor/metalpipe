
var copy = require('./copy')


module.exports = function Other (context, options = {})
{
	return function OTHER ()
	{
		var { $from, $to } = context

		var ignore = (options.ignore || [])

		var from =
		[
			'**/*',
			'!**/*.js',
			'!package.json',
			...ignore,
		]
		.map(glob => $from(glob))

		return copy(
		{
			context,
			from,
			to: $to(),
			name: 'copy$',
		})
	}
}
