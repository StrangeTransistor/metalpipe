
module.exports = function is_live (context)
{
	var { final, once } = context.opts

	return (! (final || once))
}
