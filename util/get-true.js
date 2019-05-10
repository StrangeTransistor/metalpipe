
module.exports = function get_true (options, key)
{
	if (! (key in options)) return true
	return (!! options.key)
}
