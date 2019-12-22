// TODO: vendor concat
// TODO: jsx
// TODO: code split

var { src } = require('gulp')
var { dest: dst } = require('gulp')


var live   = require('../../util/live')
var rollup = require('../../unit/rollup')
var js_ext = require('../../unit/js-ext')

var onwarn = require('./onwarn')
var is_typescript = require('./is-typescript')


module.exports = function javascript (context)
{
	return function JAVASCRIPT ()
	{
		var $static = context.$to.$static

		context.typescript = is_typescript(context)

		var pr = context.notify.process('JAVASCRIPT')

		return live(context, glob_activator(context),
		function javascript$ ()
		{
			return src(glob_entry(context), { allowEmpty: true })
			.pipe(rollup(...config(context)))
			.on('error', pr.error).on('end', pr.stable)
			.pipe(js_ext())
			.pipe(final(context))
			.pipe(dst($static()))
		})
	}
}


var ext_rs    = [ 'mst.html', 'pug', ]
var ext_input = [ 'js' ]

function glob_activator (context)
{
	var ext = [ ...ext_rs, ...ext_input ]

	if (context.typescript)
	{
		ext = [ ...ext, 'ts' ]
	}

	var glob = ext.map(ext => `**/*.${ ext }`)

	if (context.typescript)
	{
		glob =
		[
			...glob,
			'**/*.ts',
			'!**/*.d.ts',
		]
	}

	return glob.map(glob => context.$from(glob))
}

function glob_entry (context)
{
	var ext = [ ...ext_input ]

	if (context.typescript)
	{
		ext = [ ...ext, 'ts' ]
	}

	var glob = ext.map(ext => `index/*.${ ext }`)

	if (context.typescript)
	{
		glob =
		[
			...glob,
			'!**/*.d.ts',
		]
	}

	return glob.map(glob => context.$from(glob))
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


function plugins (context)
{
	var { $from, opts } = context

	var resolve  = require('rollup-plugin-node-resolve')
	var globals  = require('rollup-plugin-node-globals')
	var builtins = require('rollup-plugin-node-builtins')
	var commonjs = require('rollup-plugin-commonjs')

	var json     = require('@rollup/plugin-json')
	var aliases  = require('rollup-plugin-import-alias')
	var virtual  = require('rollup-plugin-virtual')

	var mustache = require('rollup-plugin-mustache')
	var pug      = require('rollup-plugin-pug')

	var sucrase  = require('./sucrase')


	var plugins =
	[
		pug({ basedir: $from(), pugRuntime: 'pug-runtime' }),
		mustache({ include: '**/*.mst.html' }),
		/* pug must precede extended syntaxes (flow) */
		json(),
		virtual({ '~metalpipe': 'export var dev = ' + opts.dev }),
		sucrase(context),

		builtins(),
		resolve(
		{
			mainFields: [ 'browser', 'module', 'main' ],
			extensions: [ '.ts', '.js' ],
		}),
		aliases(
		{
			Paths: { '~lib': $from() },
			Extensions: [ 'ts', 'js', 'json', 'mst.html', 'static.pug', 'pug' ],
		}),
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
