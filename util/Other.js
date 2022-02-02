
var Fileset = require('./Fileset')

var defaults =
{
	// ignore_generic: true,
	ignore_test: false,
}

module.exports = function Other (options)
{
	options = { ...defaults, ...options }

	var handled  = Fileset()
	var ignored  = Fileset()

//	if (options.ignore_generic)
//	{
	ignored.append(ignore_generic)
//	}
	if (options.ignore_test)
	{
		ignored.append(ignore_test)
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
