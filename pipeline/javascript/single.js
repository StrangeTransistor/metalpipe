
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

		var ignore = (options.ignore || [])

		var from = [ '**/*.js', ...ignore ].map(glob => $from(glob))

		var pr = context.notify.process('JAVASCRIPT')

		// TODO: ensure cache is on

		return live(context, from, function javascript$ ()
		{
			return src(from, { allowEmpty: true })
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


// var mustache = require('rollup-plugin-mustache')
// var pug      = require('rollup-plugin-pug')

var sucrase  = require('rollup-plugin-sucrase')


function plugins (/*{ $from }*/)
{
	var plugins =
	[
		// TODO: templates
		// pug({ basedir: $from(), pugRuntime: 'pug-runtime' }),
		// mustache({ include: '**/*.mst.html' }),
		/* pug must precede extended syntaxes (flow) */
		sucrase({ transforms: [ 'flow' ] }),
	]

	return plugins
}
