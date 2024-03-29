
var { basename } = require('path')
var { existsSync: exists } = require('fs')

var fallback = require('../util/get-fallback')

var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/backend/with-package')
var Javascript = require('../pipeline/javascript/single')
var Other = require('../pipeline/other')
var Digest = require('../pipeline/digest')
var Serve = require('../pipeline/backend/serve')

var is_typescript = require('../pipeline/javascript/is-typescript')


module.exports = function frontend (context)
{
	context.opts.instance = fallback(context.opts, 'instance', () =>
	{
		return basename(context.$to())
	})

	context.typescript = is_typescript(context)
	context.other.ignored.append('*.d.ts')
	if (exists(context.$from('web/gulpfile.js')))
	{
		context.other.ignored.append('web/**')
	}

	context.describe()

	var { series, parallel } = context.gulp

	var clean = Clean(context)

	var pkg = WithPackage(context)
	var javascript = Javascript(context)
	var digest = Digest(context)
	var serve = Serve(context)

	var other = Other(context)

	return series(
		clean,
		pkg,
		digest,
		parallel(
			javascript,
			serve,
			other
		)
	)
}
