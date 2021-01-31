// TODO: clear files (iop, autolint, comments, spaces)

var { src } = require('gulp')
var { dest: dst } = require('gulp')


var rollup = require('../../unit/rollup')
var js_ext = require('../../unit/js-ext')

var live = require('../../util/live')

var onwarn = require('./onwarn')


module.exports = function javascript (context, options = {})
{
	var ignored = []
	if (options.ignore)
	{
		ignored = options.ignore.view()

		options.ignore.add(glob_ignore(context))
	}

	var { $from, $to } = context

	var glob = glob_entry(context)
	var from = [ ...glob, ...ignored ].map(glob => $from(glob))

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

function glob_ignore (context)
{
	var glob = [ '**/*.js' ]

	if (context.typescript)
	{
		/* reversed after */
		glob =
		[
			...glob,
			'**/tsconfig.json',
			'!**/*.d.ts', /* required, because of next line */
			'**/*.ts',
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

function plugins (context)
{
	var plugins =
	[
		sucrase(context),
	]

	return plugins
}
