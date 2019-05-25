// TODO: vendor concat

var { src } = require('gulp')
var { dest: dst } = require('gulp')

var guif = require('gulp-if')
var mpipe = require('multipipe')


var rollup = require('../unit/rollup')
var stamp  = require('../unit/hash-stamp')

var live = require('../util/live')
var get_true = require('../util/get-true')


module.exports = function javascript (context)
{
	return function JAVASCRIPT ()
	{
		var { $from, $to } = context

		return live(context, $from('**/*.js'), function javascript$ ()
		{
			return src($from('index/index.js'), { allowEmpty: true })
			.pipe(rollup(...config(context)))
			.pipe(final(context))
			.pipe(dst($to()))
		})
	}
}


function config (context)
{
	var input =
	{
		plugins: plugins(context),

		onwarn (warning)
		{
			console.debug('Rollup: %s (%s)', warning.toString(), warning.code)
		}
	}

	var output =
	{
		format: 'iife',
		file: 'index.js',
	}

	return [ input, output ]
}


var resolve  = require('rollup-plugin-node-resolve')
var globals  = require('rollup-plugin-node-globals')
var builtins = require('rollup-plugin-node-builtins')
var commonjs = require('rollup-plugin-commonjs')

var aliases  = require('rollup-plugin-import-alias')

var mustache = require('rollup-plugin-mustache')
var pug      = require('rollup-plugin-pug')

var sucrase  = require('rollup-plugin-sucrase')


function plugins ({ $from })
{
	var plugins =
	[
		pug({ basedir: $from(), pugRuntime: 'pug-runtime' }),
		mustache({ include: '**/*.mst.html' }),
		/* pug must precede extended syntaxes (flow) */
		sucrase({ transforms: [ 'flow' ] }),

		globals(),
		builtins(),
		resolve({ mainFields: [ 'module', 'main', 'browser' ] }),
		aliases({ Paths: { '~lib': $from() }, }),
		commonjs(),
	]

	return plugins
}


var babel = require('gulp-babel')

function final (context)
{
	var presets =
	[
		'@babel/preset-env',
	]

	if (get_true(context.opts, 'minify'))
	{
		presets.push('minify')
	}

	var hash = context.opts.hash

	return guif(context.opts.final,
		mpipe(
			babel(
			{
				presets,
				comments: false,
			}),
			stamp(hash)
		)
	)
}
