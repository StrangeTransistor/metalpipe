
var { dest: dst } = require('gulp')

var guif = require('gulp-if')

var dgs = require('../unit/digest')


module.exports = function digest (context)
{
	return function DIGEST ()
	{
		var { $to } = context

		return dgs(context)
		.pipe(guif(context.opts.final, dst($to())))
	}
}
