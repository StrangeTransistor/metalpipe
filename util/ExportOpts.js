
var entries = Object.entries


module.exports = function ExportOpts (base, pkg)
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
		var version = pkg.version
		if (base.vars)
		{
			var vars = evaluate(base.vars, base, pkg)
		}
		var opts =
		{
			...vars,
			version,
		}

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


function evaluate (value, ...context)
{
	if (typeof value !== 'function') return value
	return value(...context)
}
