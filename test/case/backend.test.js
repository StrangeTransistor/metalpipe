

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

	xit('final', () =>
	{
		var tmp =  origin('frontend')
		var  cl = collate('frontend/final')

		run('gulp', [ '--final', '--no-minify', '--hash', 'ABCDEFG' ], tmp)

		expect_release(cl, tmp.partial('release/final'), { hash: 'ABCDEFG' })
	})

	xit('final with minification', () =>
	{
		var tmp =  origin('frontend')
		var  cl = collate('frontend/minify')

		run('gulp', [ '--final', '--hash', 'ABCDEFG' ], tmp)

		expect_release(cl, tmp.partial('release/final'), { hash: 'ABCDEFG' })
	})
})
