

module.exports = function digest (context)
{
	return function DIGEST ()
	{
		if (! context.opts.final)
		{
			var nothing = require('../unit/nothing')

			return nothing().end()
		}

		var { dest: dst } = require('gulp')
		var dgs = require('../unit/digest')

		var { $to } = context

		return dgs(context)
		.pipe(dst($to()))
	}
}
