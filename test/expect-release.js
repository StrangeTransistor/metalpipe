
var { expect } = require('chai')

var compare_release = require('./compare-release')
var expect_digest = require('./expect-digest')


module.exports = (cl, tmp, digest) =>
{
	expect(compare_release(cl(), tmp())).ok

	if (digest)
	{
		expect_digest(tmp('release.json'), digest)
	}
}
