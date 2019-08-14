

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

	it('final', () =>
	{
		var tmp =  origin('frontend')
		var  cl = collate('frontend/final')

		run('gulp', [ '--final', '--no-minify', '--hash', 'ABCDEFG' ], tmp)

		expect_release(cl, tmp.partial('release/final'), { hash: 'ABCDEFG' })
	})

	it('final with minification', () =>
	{
		var tmp =  origin('frontend')
		var  cl = collate('frontend/minify')

		run('gulp', [ '--final', '--hash', 'ABCDEFG' ], tmp)

		expect_release(cl, tmp.partial('release/final'), { hash: 'ABCDEFG' })
	})
})
