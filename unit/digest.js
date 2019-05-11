
var dump = (x) => JSON.stringify(x, null, '  ')

var file = require('gulp-file')

var rev = require('../util/rev')


module.exports = function digest ()
{
	var
	_ = rev()
	_ = dump(_)

	return file('release.json', _, { src: true })
}
