

var origin = require('../origin')
var collate = require('../rootpath/collate')

var run = require('../run')
var expect_release = require('../expect-release')


describe('TypeScript Library', () =>
{
	it('dev', () =>
	{
		var tmp =  origin('library-typescript')
		var  cl = collate('library-typescript/dev')

		run('gulp', [ '--once' ], tmp)

		expect_release(cl, tmp.partial('release/dev'))
	})

	// TODO: ignore test
	it('final', () =>
	{
		var tmp =  origin('library-typescript')
		var  cl = collate('library-typescript/final')

		run('gulp', [ '--final' ], tmp)

		expect_release(cl, tmp.partial('release/final'))
	})

	// TODO: test target
	// xit('test target?')
})
