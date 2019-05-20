
var randomstring = require('randomstring').generate

var fallback = require('./get-fallback')


module.exports = function get_hash (options)
{
	return fallback(options, 'hash', random)
}


function random ()
{
	return randomstring(
	{
		length: 7,
		capitalization: 'lowercase',
	})
}
