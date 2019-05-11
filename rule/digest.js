
var { dest: dst } = require('gulp')

var dgs = require('../unit/digest')


module.exports = function digest (context)
{
	return function DIGEST ()
	{
		var { $to } = context

		return dgs()
		.pipe(dst($to()))
	}
}
