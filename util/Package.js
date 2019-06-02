
var { readFileSync: read_file } = require('fs')

var { load } = require('./json')


module.exports = function Package ($root)
{
	var filename = $root('package.json')

	try
	{
		var
		_ = read_file(filename, { encoding: 'utf-8' })
		_ = load(_)

		return _
	}
	catch (e)
	{
		return null
	}
}
