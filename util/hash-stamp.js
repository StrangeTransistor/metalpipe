
var { parse, format } = require('path')


module.exports = function stamp (filename, hash)
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
}
