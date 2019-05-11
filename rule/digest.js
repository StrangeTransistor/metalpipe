
var dump = (x) => JSON.stringify(x, null, '  ')

var { dest: dst } = require('gulp')

var file = require('gulp-file')

var rev = require('../util/rev')


module.exports = function digest (context)
{
	return function DIGEST ()
	{
		var { $to } = context

		var
		_ = rev()
		_ = dump(_)

		return file('release.json', _, { src: true })
		.pipe(dst($to()))
	}
}
