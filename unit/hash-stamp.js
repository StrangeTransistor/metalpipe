
var st = require('../util/hash-stamp')

var rename = require('./rename')


module.exports = function stamp (hash)
{
	return rename(filename =>
	{
		return st(filename, hash)
	})
}
