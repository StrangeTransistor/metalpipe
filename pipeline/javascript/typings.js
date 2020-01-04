
var { src } = require('gulp')
var { dest: dst } = require('gulp')
var nothing = require('../../unit/nothing')


module.exports = function Typings (context, { ignore })
{
	if (! context.typescript)
	{
		return function TYPINGS ()
		{
			return nothing().end()
		}
	}

	var ignored = ignore.view()

	var { $from, $to } = context

	var glob =
	[
		'**/*.ts',
		'!**/*.d.ts',
		'!test/**',
		'!tests/**',
		...ignored,
	]

	glob = glob.map(glob => $from(glob))

	var Typescript = require('gulp-typescript')

	return function TYPINGS ()
	{
		var streams = src(glob)
		.pipe(Typescript({ declaration: true }))

		return streams.dts.pipe(dst($to()))
	}
}
