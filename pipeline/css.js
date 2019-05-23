
var { src } = require('gulp')
var { dest: dst } = require('gulp')

var concat = require('gulp-concat')
var guif = require('gulp-if')
var mpipe = require('multipipe')


var less = require('../unit/less')
var prefix = require('../unit/autoprefixer')
var cssnano = require('../unit/cssnano')
var rehash = require('../unit/rehash')

var live = require('../util/live')
var get_true = require('../util/get-true')


module.exports = function css (context)
{
	return function CSS ()
	{
		var { $from, $to } = context

		return live(context, $from('**/*.less'), function css$ ()
		{
			return src($from('index/index.less'), { allowEmpty: true })
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
	var hash = context.opts.hash

	return guif(context.opts.final,
		mpipe(
			prefix(),
			guif(minify, cssnano()),
			guif(!! hash, rehash(hash)),
		)
	)
}