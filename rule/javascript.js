
var { src } = require('gulp')
var { dest: dst } = require('gulp')

import guif from 'gulp-if'


import rollup from '../unit/rollup'

import live from '../util/live'
import is_final from '../util/is-final'


export default function javascript ({ $from, $to })
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


import resolve  from 'rollup-plugin-node-resolve'
import globals  from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'

import aliases  from 'rollup-plugin-import-alias'

import mustache from 'rollup-plugin-mustache'
import pug from 'rollup-plugin-pug'

import sucrase  from 'rollup-plugin-sucrase'


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


import babel from 'gulp-babel'

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
