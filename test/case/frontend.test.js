
var { expect } = require('chai')
var origin = require('../origin')
var collate = require('../collate-rootpath')

var run = require('../run')
var compare = require('../compare-release')
// var digest = require('../expect-digest')


describe('Frontend', () =>
{
	it('dev', () =>
	{
		var tmp = origin('frontend')
		var cl  = collate('frontend/dev')

		run('gulp --once', tmp)

		expect(compare(cl(), tmp('release/dev'))).ok
		// digest(tmp('release/dev/release.json'), { hash: true })
	})

	xit('final', () =>
	{
	})
})
