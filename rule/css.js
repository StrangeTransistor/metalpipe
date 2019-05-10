
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var concat = require('gulp-concat')
var guif = require('gulp-if')


var less = require('../unit/less')
var prefix = require('../unit/autoprefixer')
var cssnano = require('../unit/cssnano')

var live = require('../util/live')
var get_true = require('../util/get-true')


module.exports = function css (context)
{
	return function CSS ()
	{
		var { $from, $to } = context

		return live(context, $from('**/*.less'), function css$ ()
		{
			return src($from('index/index.less'))
			.pipe(less(context))
			.pipe(concat('index.css'))
			.pipe(final(context))
			.pipe(dst($to()))
		})
	}
}

function final (context)
{
	var minify = get_true(context.opts, 'minify')

	return guif(context.opts.final,
		prefix()
		.pipe(guif(minify, cssnano()))
	)
}
