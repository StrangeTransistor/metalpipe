// TODO: clear files (iop, autolint, comments, spaces)

var { src } = require('gulp')
var { dest: dst } = require('gulp')


var rollup = require('../../unit/rollup')
var js_ext = require('../../unit/js-ext')

var live = require('../../util/live')
var Fileset = require('../../util/Fileset')

var onwarn = require('./onwarn')


module.exports = function javascript (context)
{
	var { $from, $to } = context
	var { other } = context

	var glob = glob_entry(context)
	var ignored = other.ignored.negate().view()
	var from = Fileset(glob, ignored).base($from).view()

	other.handled.append(glob_handled(context))

	var pr = context.notify.process('JAVASCRIPT')

	return function JAVASCRIPT ()
	{
		return live(context, from, function javascript$ (filename)
		{
			filename || (filename = from)

			return src(filename, { base: $from() })
			.pipe(rollup(...config(context)))
			.on('error', pr.error).on('end', pr.stable)
			.pipe(js_ext())
			// .pipe(final(context)) TODO: final
			.pipe(dst($to()))
		})
	}
}


function glob_entry (context)
{
	var glob = [ '**/*.js' ]

	if (context.typescript)
	{
		glob =
		[
			...glob,
			'**/*.ts',
			'!**/*.d.ts',
		]
	}

	return glob
}

function glob_handled (context)
{
	var glob = [ '**/*.js' ]

	if (context.typescript)
	{
		glob =
		[
			...glob,
			'**/tsconfig.json',
			'**/*.ts',
			'!**/*.d.ts',
		]
	}

	return glob
}


function config (context)
{
	var input =
	{
		plugins: plugins(context),

		external () { return true },

		onwarn,
	}

	var output =
	{
		format:  'cjs',
		exports: 'auto',
	}

	return [ input, output ]
}


var sucrase = require('./sucrase')
var label   = require('./label')

function plugins (context)
{
	var plugins =
	[
		sucrase(context),
		label(context),
	]

	return plugins
}
