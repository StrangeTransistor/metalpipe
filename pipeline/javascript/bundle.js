// TODO: vendor concat
// TODO: jsx
// TODO: ts
// TODO: code split

var { src } = require('gulp')
var { dest: dst } = require('gulp')


var live   = require('../../util/live')
var rollup = require('../../unit/rollup')

var onwarn = require('./onwarn')


module.exports = function javascript (context)
{
	return function JAVASCRIPT ()
	{
		var { $from, $to } = context

		var from = [ 'js', 'mst.html', 'pug' ].map(ext =>
		{
			return $from(`**/*.${ ext }`)
		})

		var pr = context.notify.process('JAVASCRIPT')

		return live(context, from, function javascript$ ()
		{
			return src($from('index/*.js'), { allowEmpty: true })
			.pipe(rollup(...config(context)))
			.on('error', pr.error).on('end', pr.stable)
			.pipe(final(context))
			.pipe(dst($to.$static()))
		})
	}
}


function config (context)
{
	var input =
	{
		plugins: plugins(context),

		onwarn,
	}

	var output = { format: 'iife' }

	return [ input, output ]
}


function plugins ({ $from, opts })
{
	var resolve  = require('rollup-plugin-node-resolve')
	var globals  = require('rollup-plugin-node-globals')
	var builtins = require('rollup-plugin-node-builtins')
	var commonjs = require('rollup-plugin-commonjs')

	var json     = require('rollup-plugin-json')
	var aliases  = require('rollup-plugin-import-alias')
	var virtual  = require('rollup-plugin-virtual')

	var mustache = require('rollup-plugin-mustache')
	var pug      = require('rollup-plugin-pug')

	var sucrase  = require('rollup-plugin-sucrase')


	var plugins =
	[
		pug({ basedir: $from(), pugRuntime: 'pug-runtime' }),
		mustache({ include: '**/*.mst.html' }),
		/* pug must precede extended syntaxes (flow) */
		json(),
		virtual({ '~metalpipe': 'export var dev = ' + opts.dev }),
		sucrase({ transforms: [ 'flow' ] }),

		builtins(),
		resolve({ mainFields: [ 'browser', 'module', 'main' ] }),
		aliases({ Paths: { '~lib': $from() }, }),
		commonjs(),
		globals(),
	]

	return plugins
}


function final (context)
{
	if (! context.opts.final)
	{
		var nothing  = require('../../unit/nothing')

		return nothing()
	}

	var get_true = require('../../util/get-true')
	var mpipe    = require('multipipe')

	var presets =
	[
		require('@babel/preset-env'),
	]

	if (get_true(context.opts, 'minify'))
	{
		presets.push(require('babel-preset-minify'))
	}

	var hash  = context.opts.hash

	var babel = require('gulp-babel')
	var stamp = require('../../unit/hash-stamp')

	return mpipe(
		babel(
		{
			presets,
			comments: false,
		}),
		stamp(hash)
	)
}
