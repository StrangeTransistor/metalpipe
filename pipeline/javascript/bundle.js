// TODO: code split?
// TODO: vendor concat

var { src } = require('gulp')
var { dest: dst } = require('gulp')

var live   = require('../../util/live')
var rollup = require('../../unit/rollup')
var sourcemaps = require('../../unit/sourcemaps')
var js_ext = require('../../unit/js-ext')

var onwarn = require('./onwarn')
var Exts = require('./Exts')


module.exports = function javascript (context)
{
	var $static = context.$to.$static

	var exts = Exts(context)

	return function JAVASCRIPT ()
	{
		var maps = sourcemaps(context)
		var pr = context.notify.process('JAVASCRIPT')

		return live(context, glob_activator(exts, context),
		function javascript$ ()
		{
			return src(glob_entry(exts, context))
			.pipe(maps.init())
			.pipe(rollup(...config(context)))
			.pipe(maps.tidy_tree(path =>
			{
				path = path.replace(/^(..\/)+/, '')
				path = path.replace(/\.pnpm\/.+?\/.+?\//, '')
				return path
			}))
			.pipe(maps.write())
			.on('error', pr.error).on('end', pr.stable)
			.pipe(js_ext())
			.pipe(final(context))
			.pipe(dst($static()))
		})
	}
}


function glob_activator (exts, context)
{
	exts = exts.add([ 'mst.html', 'pug' ])

	return exts.view_onto(context.$from('**/*'))
}

function glob_entry (exts, context)
{
	return exts.view_onto(context.$from('index/*'))
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

	var globals  = require('rollup-plugin-node-globals')
	var builtins = require('rollup-plugin-node-builtins')
	var commonjs = require('@rollup/plugin-commonjs')

	var json     = require('@rollup/plugin-json')
	var aliases  = require('rollup-plugin-import-alias')
	var virtual  = require('@rollup/plugin-virtual')

	var mustache = require('rollup-plugin-mustache')
	var pug      = require('rollup-plugin-pug')

	var sucrase  = require('./sucrase')
	var label    = require('./label')



	var plugins =
	[
		pug({ basedir: $from(), pugRuntime: 'pug-runtime' }),
		mustache({ include: '**/*.mst.html' }),
		/* pug must precede extended syntaxes (flow) */
		json(),
		virtual({ '~metalpipe': 'export var dev = ' + opts.dev }),
		env(context),
		sucrase(context),
		label(context),

		builtins(),
		resolve(context),
		aliases(
		{
			Paths: { '~lib': $from() },
			Extensions: [ 'tsx', 'ts', 'jsx', 'js', 'json', 'mst.html', 'static.pug', 'pug' ],
		}),
		commonjs(
		{
			requireReturnsDefault: 'preferred', /* auto */
		}),
		globals(),
	]

	return plugins
}


function resolve (context)
{
	var resolve = require('@rollup/plugin-node-resolve').default

	var mainFields = [ 'browser', 'module', 'main' ]
	if (context.opts.cjs)
	{
		mainFields = [ 'browser', 'main' ]
	}

	return resolve(
	{
		mainFields,
		extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
	})
}

function env (context)
{
	var replace = require('@rollup/plugin-replace')

	var mode = 'development'
	if (context.opts.final)
	{
		mode = 'production'
	}

	return replace(
	{
		'process.env.NODE_ENV': `'${ mode }'`,
	})
}


function final (context)
{
	if (! context.opts.final)
	{
		var nothing = require('../../unit/nothing')

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
