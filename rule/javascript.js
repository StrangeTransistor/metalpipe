
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
			.pipe(rollup(config()))
			// .pipe(concat('index.css'))
			.pipe(dst($to()))
		})
	}
}

function config ()
{
	return {
		output:
		{
			format: 'iife',
			file: 'index.js',
		},
	}
}
