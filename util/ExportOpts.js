
var entries = Object.entries


module.exports = function ExportOpts (base)
{
	var keys =
	[
		'final',
		'dev',
		'test',
		'hash',
		'instance',
	]

	function as_map ()
	{
		var opts = {}
		for (var key of keys)
		{
			if (key in base)
			{
				opts[key] = base[key]
			}
			else
			{
				opts[key] = null
			}
		}
		return opts
	}

	function as_pairs ()
	{
		return entries(as_map())
	}

	return { as_map, as_pairs }
}
