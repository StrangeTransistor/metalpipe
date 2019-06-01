

var origin = require('../origin')
var collate = require('../rootpath/collate')

var run = require('../run')
var expect_release = require('../expect-release')


describe('Frontend', () =>
{
	it('dev', () =>
	{
		var tmp =  origin('frontend')
		var  cl = collate('frontend/dev')

		run('gulp', [ '--once' ], tmp)

		expect_release(cl, tmp.partial('release/dev'))
	})

	xit('final', () =>
	{
	})
})
