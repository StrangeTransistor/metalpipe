
module.exports = Ignore

function Ignore (list, list_append)
{
	list        || (list = overall_ignored())
	list_append || (list_append = [])

	list = [].concat(list, list_append)

	function add (glob)
	{
		list = list.concat(glob)
	}

	function view ()
	{
		return list.map(x => '!' + x)
	}

	return { add, view }
}


Ignore.overall_ignored = overall_ignored

function overall_ignored ()
{
	return 0,
	[
		'package.json',
		'node_modules/**',
		'release/**',
		'gulpfile.js',

		'*npm-debug.log',
		'coverage/**',
		'flow-typed/**',
	]
}
