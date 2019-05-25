
var random = require('randomstring').generate

var fallback = require('./get-fallback')


module.exports = function get_hash (options)
{
	return fallback(options, 'hash', () =>
	{
		if (! options.final) { return null }

		return random(
		{
			length: 7,
			capitalization: 'lowercase',
		})
	})
}
