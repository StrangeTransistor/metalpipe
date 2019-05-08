
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var concat = require('gulp-concat')
var guif = require('gulp-if')


var less = require('../unit/less')
var prefix = require('../unit/autoprefixer')
var cssnano = require('../unit/cssnano')

var live = require('../util/live')
var is_final = require('../util/is-final')


module.exports = function css ({ $from, $to })
{
	return function CSS ()
	{
		return live($from('**/*.less'), function css$ ()
		{
			return src($from('index/index.less'))
			.pipe(less({ $from }))
			.pipe(concat('index.css'))
			.pipe(final())
			.pipe(dst($to()))
		})
	}
}

function final ()
{
	return guif(is_final(),
		prefix()
		.pipe(cssnano())
	)
}
