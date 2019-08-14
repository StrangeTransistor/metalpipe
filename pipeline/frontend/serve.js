
var srv = require('gulp-serve')

var get_true = require('../../util/get-true')
var is_live = require('../../util/is-live')
var fnom = require('../../util/fnom')

var label = 'SERVE'


module.exports = function serve (context)
{
	var do_serve = get_true(context.opts, 'serve')

	if (! do_serve) { return noop() }
	if (! is_live(context)) { return noop() }

	var { $to } = context
	var port = (+context.opts.serve || 8080)

	return fnom(label, srv(
	{
		port,
		root: [ $to() ],
	}))
}


function noop ()
{
	return fnom(label, async () => {})
}
