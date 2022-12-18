// TODO: code split?
// TODO: vendor concat
// TODO: fix sourcemap?

var { src } = require('gulp')
var { dest: dst } = require('gulp')

var live   = require('../../util/live')
var rollup = require('../../unit/rollup')
// var sourcemaps = require('../../unit/sourcemaps')
var js_ext = require('../../unit/js-ext')

var onwarn = require('./onwarn')
var Exts = require('./Exts')


module.exports = function javascript (context)
{
	var $static = context.$to.$static

	var exts = Exts(context)

	return function JAVASCRIPT ()
	{
		// var maps = sourcemaps(context)
		var pr = context.notify.process('JAVASCRIPT')

		return live(context, glob_activator(exts, context),
		function javascript$ ()
		{
			return src(glob_entry(exts, context))
			// .pipe(maps.init({ clone: true }))
			.pipe(rollup(...config(context)))
			.on('error', pr.error).on('end', pr.stable)
			/*.pipe(maps.tidy_tree(path =>
			{
				path = path.replace(/^(..\/)+/, '')
				path = path.replace(/\.pnpm\/.+?\/.+?\//, '')
				return path
			}))*/
			// .pipe(maps.write())
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
	var { $from } = context

	var globals  = require('rollup-plugin-node-globals')
	var builtins = require('rollup-plugin-node-builtins')
	var commonjs = require('./commonjs')
	var resolve  = require('./node-resolve')

	var json     = require('@rollup/plugin-json')
	var aliases  = require('rollup-plugin-import-alias')

	var mustache = require('rollup-plugin-mustache')
	var pug      = require('rollup-plugin-pug')

	var analyze  = require('./analyze')
	var sucrase  = require('./sucrase')
	var label    = require('./label')
	var virtual  = require('./virtual')

	var plugins =
	[
		pug(
		{
			pugRuntime: 'pug-runtime',
			basedir: $from(),
			locals: context.exp_opts.as_map(),
		}),
		mustache({ include: '**/*.mst.html' }),
		/* pug must precede extended syntaxes (flow) */
		json(),
		virtual(context),
		env(context),
		sucrase(context),
		label(context),

		builtins(),
		resolve(context),
		aliases(
		{
			Paths: { '~lib': $from() },
			// TODO: extset
			Extensions: [ 'tsx', 'ts', 'jsx', 'js', 'json', 'mst.html', 'static.pug', 'pug' ],
		}),
		commonjs(),
		globals(),
	]

	if (context.opts.final)
	{
		plugins = [ ...plugins, analyze(context) ]
	}

	return plugins
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

	var minify = []
	if (get_true(context.opts, 'minify'))
	{
		var terser = require('gulp-terser')

		minify = [ terser() ]
	}

	var babel = require('gulp-babel')
	var stamp = require('../../unit/hash-stamp')

	var hash = context.opts.hash
	var presets =
	[
		require('@babel/preset-env'),
	]

	var pipe =
	[
		babel({ presets, compact: false }),
		stamp(hash),
		...minify,
	]

	var mpipe = require('multipipe')
	return mpipe(...pipe)
}
