
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var live = require('../util/live')
var fnom = require('../util/fnom')


module.exports = function copy ({ context, from, to, name })
{
	name || (name = 'copy$')

	return live(context, from, fnom(name, () =>
	{
		return src(from)
		.pipe(dst(to))
	}))
}
