// TODO: nodemon first?

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

	return fnom(label, () =>
	{
		setTimeout(() =>
		{
			var { spawn } = require('child_process')

			spawn('npm', [ 'run', 'serve' ], { stdio: 'inherit' })
		}
		, 2e3)
	})
}


function noop (reason)
{
	reason && console.warn('Serve:', reason)

	return fnom(label, async () => {})
}
