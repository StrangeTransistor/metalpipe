
var { src } = require('gulp')
var { dest: dst } = require('gulp')

// var guif = require('gulp-if')
// var mpipe = require('multipipe')


var rollup = require('../unit/rollup')
// var stamp  = require('../unit/hash-stamp')

var live = require('../util/live')
// var get_true = require('../util/get-true')


module.exports = function javascript (context)
{
	return function JAVASCRIPT ()
	{
		var { $root, $to } = context
		var $from = $root


		//var from = [ 'js', 'mst.html', 'pug' ].map(ext =>
		//{
		//	return $from(`**/*.${ ext }`)
		//})
		var from = $from('**/*.js')
		console.debug(from)

		var pr = context.notify.process('JAVASCRIPT')

		// TODO: ensure cache is on

		return live(context, from, function javascript$ ()
		{
			return src(from, { allowEmpty: true })
			// .pipe(require('gulp-debug')())
			.pipe(rollup(...config(context)))
			// .pipe(require('gulp-debug')())
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

		// external (id) { return (id !== input) },
		// external () { return true },

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
