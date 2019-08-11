

var origin = require('../origin')
var collate = require('../rootpath/collate')

var run = require('../run')
var expect_release = require('../expect-release')


describe('Library', () =>
{
	it('dev', () =>
	{
		var tmp =  origin('library')
		var  cl = collate('library/dev')

		run('gulp', [ '--once' ], tmp)

		expect_release(cl, tmp.partial('release/dev'))
	})

	// TODO: ignore test
	it('final', () =>
	{
		var tmp =  origin('library')
		var  cl = collate('library/final')

		run('gulp', [ '--final' ], tmp)

		expect_release(cl, tmp.partial('release/final'))
	})

	// TODO: test target
	// xit('test target?')
})
