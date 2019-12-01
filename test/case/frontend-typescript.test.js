

var origin = require('../origin')
var collate = require('../rootpath/collate')

var run = require('../run')
var expect_release = require('../expect-release')


describe('TypeScript Frontend', () =>
{
	it('dev', () =>
	{
		var tmp =  origin('frontend-typescript')
		var  cl = collate('frontend-typescript/dev')

		run('gulp', [ '--once' ], tmp)

		expect_release(cl, tmp.partial('release/dev'))
	})

	it('final', () =>
	{
		var tmp =  origin('frontend-typescript')
		var  cl = collate('frontend-typescript/final')

		run('gulp', [ '--final', '--no-minify', '--hash', 'ABCDEFG' ], tmp)

		expect_release(cl, tmp.partial('release/final'), { hash: 'ABCDEFG' })
	})

	it('final with minification', () =>
	{
		var tmp =  origin('frontend-typescript')
		var  cl = collate('frontend-typescript/minify')

		run('gulp', [ '--final', '--hash', 'ABCDEFG' ], tmp)

		expect_release(cl, tmp.partial('release/final'), { hash: 'ABCDEFG' })
	})
})
