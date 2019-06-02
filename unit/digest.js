
var rev = require('../util/rev')
var { dump } = require('../util/json')

var file = require('gulp-file')


module.exports = function digest (context)
{
	var _ = {}

	var p = pkg(context.package)

	_.name    = p.name
	_.version = p.version

	if (context.opts.hash) { _.hash = context.opts.hash }

	_.timestamp = (new Date).toISOString()

	_.rev = rev()

	// TODO: instance, name
	// _.name = context.package.name + '/' + _.instance
	// _.instance

	return file('release.json', dump(_), { src: true })
}

function pkg (p)
{
	return (p || { name: null, version: null })
}
