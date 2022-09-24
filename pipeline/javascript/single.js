
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var rollup = require('../../unit/rollup')
var js_ext = require('../../unit/js-ext')

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
	var from = Fileset(glob, ignored).base($from).view()

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
			.pipe(js_ext_import(context))
			.pipe(dev(context))
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
		plugins: plugins(context),

		external () { return true },

		onwarn,
	}

	var format = 'cjs'
	if (context.opts.esm)
	{
		format = 'esm'
	}

	var output =
	{
		format,
		exports: 'auto',
	}

	return [ input, output ]
}


var sucrase = require('./sucrase')
var label   = require('./label')

function plugins (context)
{
	var plugins =
	[
		sucrase(context),
		label(context),
	]

	if (! context.opts.esm)
	{
		plugins = [ ...plugins, dynamic_import() ]
	}

	return plugins
}


function dev (context)
{
	if (! context.opts.dev)
	{
		var nothing = require('../../unit/nothing')

		return nothing()
	}

	var outlander = require('./outlander')

	return outlander()
}


function js_ext_import (context)
{
	if (! context.opts.esm)
	{
		var nothing = require('../../unit/nothing')

		return nothing()
	}

	var babel = require('gulp-babel')
	var plugins = [ require('babel-plugin-add-import-extension') ]

	return babel(
	{
		plugins,
	})
}


function dynamic_import ()
{
	function renderDynamicImport ()
	{
		return { left: 'import(', right: ')' }
	}

	return { renderDynamicImport }
}
