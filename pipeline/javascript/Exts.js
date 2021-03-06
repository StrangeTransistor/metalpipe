
var Extset = require('../../util/Extset')


module.exports = function Exts (context)
{
	var exts = Extset([ 'js', 'jsx' ])

	if (context.typescript)
	{
		exts = exts.add(
		[
			'ts',
			'tsx',
			'!d.ts',
		])
	}

	return exts
}
