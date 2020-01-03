
var { basename } = require('path')

var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/backend/with-package')
var Javascript = require('../pipeline/javascript/single')
var Other = require('../pipeline/other')
var Digest = require('../pipeline/digest')
var Serve = require('../pipeline/backend/serve')

var is_typescript = require('../pipeline/javascript/is-typescript')

var Ignore = require('../util/Ignore')
var fallback = require('../util/get-fallback')


module.exports = function frontend (context)
{
	context.opts.instance = fallback(context.opts, 'instance', () =>
	{
		return basename(context.$to())
	})

	context.typescript = is_typescript(context)

	context.describe()

	var ignore = Ignore(null, 'web/**')
	ignore.test_aware(context)

	var { series, parallel } = context.gulp

	var clean = Clean(context)
	var pkg = WithPackage(context)
	var javascript = Javascript(context, { ignore })
	var other = Other(context, { ignore })
	var digest = Digest(context)
	var serve = Serve(context)

	return series(
		clean,
		parallel(
			pkg,
			javascript,
			other,
			digest,
			serve
		)
	)
}
