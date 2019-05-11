
var dump = (x) => JSON.stringify(x, null, '  ')

var file = require('gulp-file')

var rev = require('../util/rev')


module.exports = function digest ()
{
	var _ = {}

	_.version = '0' // context.version

	_.timestamp = (new Date).toISOString()

	_.rev = rev()

	// context.instance
	// context.hash

	/*
	release.instance = instance
	release.name = env.package.name + '-' + instance
	*/

	_ = dump(_)

	return file('release.json', _, { src: true })
}
