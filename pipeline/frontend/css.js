
var { src } = require('gulp')
var { dest: dst } = require('gulp')


var live = require('../../util/live')
var less = require('../../unit/less')
var sourcemaps = require('../../unit/sourcemaps')


module.exports = function css (context)
{
	return function CSS ()
	{
		var { $from, $to } = context

		var pr = context.notify.process('CSS')
		var maps = sourcemaps(context)

		return live(context, $from('**/*.less'), function css$ ()
		{
			return src($from('index/*.less'), { allowEmpty: true })
			.pipe(maps.init())
			.pipe(less(context))

			.on('error', pr.error).on('end', pr.stable)
			.on('error', pr.error.end)

			.pipe(rewrite_uri(context))
			/*.pipe(maps.mapSources((path) =>
			{
				console.log(path)
				var x = $from('index', path)
				x = context.$from.relative(x)
				console.warn(x)
				return x
			}))
			*/
			.pipe(maps.write())
			.pipe(final(context))
			.pipe(dst($to.$static()))
		})
	}
}


var postcss = require('gulp-postcss')
var rebase  = require('postcss-url')
var in_uri  = require('../../util/hash-stamp').in_uri

function rewrite_uri (context)
{
	var hash = context.opts.hash
	var stamp = in_uri(hash)

	return postcss(
	[
		rebase(
		{
			url (asset)
			{
				var { url } = asset

				url = stamp(url)
				url = url.replace(/^static\//, '')

				return url
			}
		})
	])
}


function final (context)
{
	if (! context.opts.final)
	{
		var nothing  = require('../../unit/nothing')

		return nothing()
	}

	var get_true = require('../../util/get-true')
	var mpipe    = require('multipipe')

	var pipe = []

	var prefix = require('../../unit/autoprefixer')
	pipe.push(prefix())

	var minify = get_true(context.opts, 'minify')
	if (minify)
	{
		var cssnano = require('../../unit/cssnano')
		pipe.push(cssnano())
	}

	var hash = context.opts.hash
	if (hash)
	{
		var stamp = require('../../unit/hash-stamp')
		pipe.push(stamp(hash))
	}

	return mpipe(...pipe)
}
