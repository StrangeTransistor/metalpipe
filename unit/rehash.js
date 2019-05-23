
var rh = require('../util/rehash')

var rename = require('./rename')


module.exports = function rehash (hash)
{
	return rename(filename =>
	{
		return rh(filename, hash)
	})
}
