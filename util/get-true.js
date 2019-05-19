
var True = () => true

var fallback = require('./get-fallback')


module.exports = function get_true (object, key)
{
	return (!! fallback(object, key, True))
}
