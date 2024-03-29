/* eslint complexity: [ 1, 6 ] */

var { src } = require('gulp')
var { dest: dst } = require('gulp')

var ext = require('replace-ext')

var rollup = require('../../unit/rollup')
var js_ext = require('../../unit/js-ext')
var nothing = require('../../unit/nothing')

var live = require('../../util/live')
var Fileset = require('../../util/Fileset')

var onwarn = require('./onwarn')
var Exts = require('./Exts')


module.exports = function javascript (context)
{
	var { $from, $to } = context
	var { other } = context

	var exts = Exts(context)
	var glob = glob_entry(exts)
	var ignored = other.ignored.negate().view()

	var bundle = context.opts.bundle
	if (! bundle)
	{
		var from = Fileset(glob, ignored).base($from).view()
	}
	else
	{
		if (Array.isArray(bundle))
		{
			var from = bundle
		}
		else
		{
			var from = [ context.package.main || 'index.js' ]
		}

		if (context.typescript)
		{
			from = from.map(path => ext(path, '.ts'))
		}

		from = Fileset(from, ignored).base($from).view()
	}

	other.handled.append(glob)
	if (context.typescript)
	{
		other.handled.append($from('tsconfig.json'))
	}

	return function JAVASCRIPT ()
	{
		var pr = context.notify.process('JAVASCRIPT')

		return live(context, from, function javascript$ (filename)
		{
			filename || (filename = from)

			return src(filename, { base: $from() })
			.pipe(rollup(...config(context)))
			.on('error', pr.error).on('end', pr.stable)
			.pipe(js_ext())
			.pipe(dev(context))
			// .pipe(final(context))
			.pipe(dst($to()))
		})
	}
}


function glob_entry (exts)
{
	return exts.view_onto('**/*')
}


function config (context)
{
	var input =
	{
		plugins:  plugins(context),
		external: external(context),
		onwarn,
	}

	var format = 'cjs'
	if (context.opts.esm) { format = 'esm' }

	var output =
	{
		format,
		exports: 'auto',
		/* interop: 'auto', */
		interop: 'compat',
	}

	return [ input, output ]
}

function external (context)
{
	if (! context.opts.bundle)
	{
		return (id) => (id !== '~metalpipe')
	}

	var bundle_deps = context.opts['bundle-deps']
	if (! bundle_deps)
	{
		return /node_modules/
	}

	return (id /*, p_id, isResolved */) =>
	{
		for (var dep of bundle_deps)
		{
			dep = dep.replace('/', '.')
			dep = ('node_modules.*' + dep)
			var re = new RegExp(dep)

			if (id.match(re))
			{
				return false
			}

			/* if (p_id && p_id.match(re)) return false */
		}

		return id.match(/node_modules/)
	}
}


var sucrase  = require('./sucrase')
var virtual  = require('./virtual')
var label    = require('./label')
var resolve  = require('./node-resolve')
var commonjs = require('./commonjs')
var terser   = require('@rollup/plugin-terser')
var analyze  = require('./analyze')
var rewrite  = require('rollup-plugin-rewrite')

function plugins (context)
{
	var plugins =
	[
		sucrase(context),
		label(context),
		virtual(context),
	]

	if (context.opts.bundle)
	{
		var plugins =
		[
			...plugins,
			resolve(context),
			commonjs(context),
			analyze(context),
		]
	}
	if (context.opts.esm)
	{
		plugins = [ ...plugins, explicit_ext() ]
	}
	if (! context.opts.esm)
	{
		// plugins = [ ...plugins, dynamic_import() ]
	}
	if (context.opts.minify)
	{
		var options = require('./terser')

		plugins = [ ...plugins, terser({ toplevel: true, ...options }) ]
	}

	return plugins
}

function explicit_ext ()
{
	var find = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/gm
	var re_path = /(?:".*?")|(?:'.*?')/
	var re_local = /^(\.\/)|(\.\.\/)/

	function replace ([ importee ])
	{
		var
		path = importee.match(re_path)
		path = path[0]
		path = path.slice(1, -1)

		if (! path.match(re_local)) return importee

		path = ext(path, '.js')
		importee = importee.replace(re_path, `'${ path }'`)

		return importee
	}

	return rewrite({ find, replace })
}

function dev (context)
{
	if (! context.opts.dev) return nothing()

	var outlander = require('./outlander')
	return outlander()
}


/*
function dynamic_import ()
{
	function renderDynamicImport ()
	{
		return { left: 'import(', right: ')' }
	}

	return { renderDynamicImport }
}
*/

/*
function js_ext_import (context)
{
	// "babel-plugin-add-import-extension":
	// "^1.6.0",

	if (! context.opts.esm) return nothing()

	var babel = require('gulp-babel')
	var plugins = [ require('babel-plugin-add-import-extension') ]

	return babel(
	{
		plugins,
	})
}
*/
