
var shell = require('gulp-shell')

var is_live = require('../../util/is-live')
var fnom = require('../../util/fnom')

var label = 'SERVE'


module.exports = function Serve (context)
{
	if (! is_live(context)) return noop()

	if (! context.package) return noop('no package.json')
	if (! context.package.scripts) return noop('no package.json scripts')
	if (! context.package.scripts.serve)
	{
		return noop('no package.json `serve` script')
	}

	return fnom(label, shell.task([ 'npm run serve' ]))
}


function noop (reason)
{
	reason && console.warn('Serve:', reason)

	return fnom(label, async () => {})
}
