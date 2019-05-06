
export default function Taglist (tags, subst)
{
	tags  = [].concat(tags || [])
	subst = { ...subst }

	function after (tag, ...values)
	{
		return with_index_of(tag, (tags, index) =>
		{
			return tags.splice(index + 1, 0, ...values)
		})
	}

	function before (tag, ...values)
	{
		return with_index_of(tag, (tags, index) =>
		{
			return tags.splice(index, 0, ...values)
		})
	}

	function replace (tag, ...values)
	{
		return with_index_of(tag, (tags, index) =>
		{
			return tags.splice(index, 1, ...values)
		})
	}

	function with_index_of (tag, fn)
	{
		return transform(tags =>
		{
			var index = tags.indexOf(tag)

			if (index < 0) return tags

			return fn(tags, index)
		})
	}

	function transform (fn)
	{
		return Taglist(fn(tags.slice()), subst)
	}

	function extend (patch)
	{
		return Taglist(tags, { ...subst, ...patch })
	}

	function materialize ()
	{
		return tags.map(tag => (subst[tag] || tag)).filter(Boolean)
	}

	return 0,
	{
		transform,
		extend,
		after,
		before,
		replace,
		materialize,
		valueOf: materialize,
	}
}
