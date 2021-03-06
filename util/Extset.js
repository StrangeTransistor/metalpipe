
module.exports = function Extset (...sets)
{
	var set = [].concat(...sets)

	function add (...sets)
	{
		return Extset(set, ...sets)
	}

	function view_onto (base)
	{
		return set.map(f =>
		{
			if (f[0] !== '!')
			{
				return (base + '.' + f)
			}
			else
			{
				return ('!' + base + '.' + f.slice(1))
			}
		})
	}

	return { add, view_onto }
}
