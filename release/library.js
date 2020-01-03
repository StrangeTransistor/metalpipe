
var Clean = require('../pipeline/clean')
var WithPackage = require('../pipeline/library/with-package')
var Javascript = require('../pipeline/javascript/single')
var Other = require('../pipeline/other')

var is_typescript = require('../pipeline/javascript/is-typescript')

var Ignore = require('../util/Ignore')


module.exports = function frontend (context)
{
	context.describe()

	context.typescript = is_typescript(context)

	var ignore = Ignore()
	ignore.test_aware(context)

	var { series, parallel } = context.gulp

	var clean = Clean(context)
	var pkg = WithPackage(context)
	var javascript = Javascript(context, { ignore })
	var other = Other(context, { ignore })

	return series(
		clean,
		Ts(context, { ignore }),
		parallel(
			pkg,
			javascript,
			other
		)
	)
}


var { src } = require('gulp')
var { dest: dst } = require('gulp')
var nothing = require('../unit/nothing')


function Ts (context, { ignore })
{
	console.warn(context.typescript)
	if (! context.typescript)
	{
		return () => nothing().end()
	}

	var Typescript = require('gulp-typescript')

	return function DTS ()
	{
		var { $from, $to } = context

		var ignored = ignore.view()
		var
		glob = [ '**/*.ts', '!**/*.d.ts', ...ignored ]
		glob = glob.map(glob => $from(glob))

		var streams = src(glob)
		.pipe(Typescript({ declaration: true }))

		return streams.dts.pipe(dst($to()))
	}
}
