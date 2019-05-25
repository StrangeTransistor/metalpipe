
var { parse, format } = require('path')

var curry = require('curry')


module.exports = curry((hash, filename) =>
{
	if (! hash)
	{
		return filename
	}

	filename = parse(filename)

	delete filename.base
	filename.name = (filename.name + '.' + hash)

	filename = format(filename)

	return filename
})
