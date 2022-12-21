
var { parse, format } = require('path')

var curry = require('curry')


var stamp = module.exports = curry((hash, filename) =>
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


stamp.in_uri = curry((hash, uri) =>
{
	var m = uri.match(re_uri)

	if (! m)
	{
		return uri
	}

	m[3] || (m[3] = '')

	uri = m[1] + stamp(hash, m[2]) + m[3]

	return uri
})

/* 1 = static, 2 = index.js, index.css etc, 3 = '' */
/* or */
/* 1 = static, 2 = assets, 3 = asset relpath */
var re_uri = /^(\/?static\/)(.*?)(\/.*)?$/
