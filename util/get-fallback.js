
module.exports = function get_fallback (object, key, fallback_fn)
{
	if (key in object)
	{
		return object[key]
	}
	else
	{
		return fallback_fn(object)
	}
}
