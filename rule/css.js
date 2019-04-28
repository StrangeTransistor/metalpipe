
var { src } = require('gulp')
var { dest: dst } = require('gulp')

import concat from 'gulp-concat'
import guif from 'gulp-if'


import less from '../unit/less'
import prefix from '../unit/autoprefixer'
import cssnano from '../unit/cssnano'

import live from '../util/live'
import is_prod from '../util/is-prod'


export default function css ({ $from, $to })
{
	return function CSS ()
	{
		return live($from('**/*.less'), function css$ ()
		{
			return src($from('index/index.less'))
			.pipe(less({ $from }))
			.pipe(concat('index.css'))
			.pipe(guif(is_prod(), prod()))
			.pipe(dst($to()))
		})
	}
}

function prod ()
{
	return prefix()
	.pipe(cssnano())
}
