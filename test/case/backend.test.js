

var origin = require('../origin')
var collate = require('../rootpath/collate')

var run = require('../run')
var expect_release = require('../expect-release')


describe('Backend', () =>
{
	it('dev', () =>
	{
		var tmp =  origin('backend')
		var  cl = collate('backend/dev')

		run('gulp', [ '--once' ], tmp)

		expect_release(cl, tmp.partial('release/dev'))
	})

	it('final', () =>
	{
		var tmp =  origin('backend')
		var  cl = collate('backend/final')

		run('gulp', [ '--final' ], tmp)

		expect_release(cl, tmp.partial('release/final'))
	})

	// TODO: test target
	// xit('test target?')
})
