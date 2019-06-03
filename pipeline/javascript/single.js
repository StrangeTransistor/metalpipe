
var { src } = require('gulp')
var { dest: dst } = require('gulp')


var rollup = require('../../unit/rollup')

var live = require('../../util/live')


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

		onwarn (warning)
		{
			console.debug('Rollup: %s (%s)', warning.toString(), warning.code)
		}
	}

	var output =
	{
		format: 'cjs',
		// exports: 'auto',
	}

	return [ input, output ]
}


// var mustache = require('rollup-plugin-mustache')
// var pug      = require('rollup-plugin-pug')

var sucrase  = require('rollup-plugin-sucrase')


function plugins (/*{ $from }*/)
{
	var plugins =
	[
		// pug({ basedir: $from(), pugRuntime: 'pug-runtime' }),
		// mustache({ include: '**/*.mst.html' }),
		/* pug must precede extended syntaxes (flow) */
		sucrase({ transforms: [ 'flow' ] }),
	]

	return plugins
}


// var babel = require('gulp-babel')
//
// function final (context)
// {
// 	var presets =
// 	[
// 		'@babel/preset-env',
// 	]
//
// 	if (get_true(context.opts, 'minify'))
// 	{
// 		presets.push('minify')
// 	}
//
// 	var hash = context.opts.hash
//
// 	return guif(context.opts.final,
// 		mpipe(
// 			babel(
// 			{
// 				presets,
// 				comments: false,
// 			}),
// 			stamp(hash)
// 		)
// 	)
// }
