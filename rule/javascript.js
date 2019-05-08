
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var guif = require('gulp-if')


var rollup = require('../unit/rollup')

var live = require('../util/live')
var is_final = require('../util/is-final')


module.exports = function javascript ({ $from, $to })
{
	return function JAVASCRIPT ()
	{
		return live($from('**/*.js'), function javascript$ ()
		{
			return src($from('index/index.js'))
			.pipe(rollup(...config({ $from })))
			.pipe(final())
			.pipe(dst($to()))
		})
	}
}


function config ({ $from })
{
	var input =
	{
		plugins: plugins({ $from }),
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

function final ()
{
	return guif(is_final(),
		babel(
		{
			presets:
			[
				'@babel/preset-env',
				// 'minify',
			],
			comments: false,
		})
	)
}
