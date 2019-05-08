
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var live = require('../util/live')
var fnom = require('../util/fnom')


module.exports = function copy ({ from, to, name })
{
	name || (name = 'copy$')

	return live(from, fnom(name, () =>
	{
		return src(from)
		.pipe(dst(to))
	}))
}
