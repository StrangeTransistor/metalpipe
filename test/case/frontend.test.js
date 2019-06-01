
// var { expect } = require('chai')
var origin = require('../origin')
var collate = require('../collate-rootpath')

var run = require('../run')
var compare = require('../compare-release')


describe('Frontend', () =>
{
	it('dev', () =>
	{
		var tmp = origin('frontend')
		var cl  = collate('frontend/dev')

		run('gulp --once', tmp)

		compare(cl(), tmp('release/dev'))
	})

	xit('final', () =>
	{
	})
})
