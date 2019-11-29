// TODO: clear files (iop, autolint, comments, spaces)

var { src } = require('gulp')
var { dest: dst } = require('gulp')


var rollup = require('../../unit/rollup')

var live = require('../../util/live')

var onwarn = require('./onwarn')


module.exports = function javascript (context, options = {})
{
	return function JAVASCRIPT ()
	{
		var { $from, $to } = context

		var glob = '**/*.js'

		var ignore = []
		if (options.ignore)
		{
			ignore = options.ignore.view()
			options.ignore.add(glob)
		}

		var from = [ glob, ...ignore ].map(glob => $from(glob))

		var pr = context.notify.process('JAVASCRIPT')

		return live(context, from, function javascript$ (filename)
		{
			filename || (filename = from)

			return src(filename, { base: $from(), allowEmpty: true })
			.pipe(rollup(...config(context)))
			.on('error', pr.error).on('end', pr.stable)
			// .pipe(final(context))
			.pipe(dst($to()))
		})
	}
}


function config (context)
{
	var input =
	{
		plugins: plugins(context),

		external () { return true },

		onwarn,
	}

	var output = { format: 'cjs' }

	return [ input, output ]
}


var sucrase  = require('rollup-plugin-sucrase')

function plugins (/*{ $from }*/)
{
	var plugins =
	[
		sucrase({ transforms: [ 'flow' ] }),
	]

	return plugins
}
