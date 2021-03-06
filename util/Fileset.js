
module.exports = function Fileset (...sets)
{
	var set = [].concat(...sets)

	/* @mutable */
	function append (...sets)
	{
		set = [].concat(set, ...sets)
	}

	function map (fn)
	{
		return Fileset(set.map(fn))
	}

	function base (rootpath)
	{
		return map(f => rootpath(f))
	}

	function negate ()
	{
		return map(f => '!' + f)
		.map(f => f.replace(/^!!/, ''))
	}

	function view ()
	{
		return [ ...set ]
	}

	var fileset =
	{
		append,

		map,
		base,
		negate,

		view,
	}

	return fileset
}
