
var st = require('../util/hash-stamp')

var rename = require('./rename')


module.exports = function stamp (hash)
{
	return rename(st(hash))
}
