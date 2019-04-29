
var { src } = require('gulp')
var { dest: dst } = require('gulp')

// import concat from 'gulp-concat'
// import guif from 'gulp-if'


import rollup from '../unit/rollup'

import live from '../util/live'
// import is_prod from '../util/is-prod'


export default function javascript ({ $from, $to })
{
	return function JAVASCRIPT ()
	{
		return live($from('**/*.js'), () =>
		{
			return src($from('index/index.js'))
			.pipe(rollup(...config({ $from })))
			// .pipe(concat('index.css'))
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
import sucrase  from 'rollup-plugin-sucrase'
import aliases  from 'rollup-plugin-import-alias'
import mustache from 'rollup-plugin-mustache'
// babel
// babel-preset-env
// babel-preset-minify

function plugins ({ $from })
{
	var plugins =
	[
		globals(),
		builtins(),
		resolve(),
		aliases({ Paths: { '~lib': $from() }, }),
		commonjs(),
		// sucrase({ transforms: [ 'flow' ] }),
		// mustache({ include: '**/*.mst.html' }),
	]

	return plugins
}
