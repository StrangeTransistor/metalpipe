
var { expect } = require('chai')

var { readJsonSync: read } = require('fs-extra')


module.exports = (path, options) =>
{
	options = { ...options }

	var release = read(path)

	expect(release).an('object')
	expect(release.version).eq('0.0.0')
	expect(release.timestamp).a('string')

	if (options.instance)
	{
		expect(release.instance).a('string')
		expect(release.name).a('string')
	}

	if (options.hash)
	{
		expect(release.hash).a('string')
		expect(release.hash).eq(options.hash)
	}

	expect(release.rev).a('string')
}
