
var Fileset = require('./Fileset')

var defaults =
{
	ignore_test: false,
}

module.exports = function Other (options)
{
	options = { ...defaults, ...options }

	var handled = Fileset()
	var ignored = Fileset()

	ignored.append(ignore_generic)

	if (options.ignore_test)
	{
		ignored.append(ignore_test)
	}
	if (options.ignore)
	{
		ignored.append(options.ignore)
	}

	function fileset ()
	{
		var other =
		[
			'**/*',
			...handled.negate().view(),
			...ignored.negate().view(),
		]

		return Fileset(other)
	}

	return { handled, ignored, fileset }
}


var ignore_generic =
[
	'package.json',
	'node_modules/**',
	'release/**',
	'gulpfile.js',

	'*npm-debug.log',
	'coverage/**',
	'flow-typed/**',
]

var ignore_test =
[
	 'test/**',
	'tests/**',
	 'perf/**',
]
