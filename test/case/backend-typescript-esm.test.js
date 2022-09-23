

var origin = require('../origin')
var collate = require('../rootpath/collate')

var run = require('../run')
var expect_release = require('../expect-release')


describe('TypeScript Backend', () =>
{
	it('dev', () =>
	{
		var tmp =  origin('backend-typescript')
		var  cl = collate('backend-typescript-esm/dev')

		run('gulp', [ '--once', '--esm' ], tmp)

		expect_release(cl, tmp.partial('release/dev'))
	})

	it('final', () =>
	{
		var tmp =  origin('backend-typescript')
		var  cl = collate('backend-typescript-esm/final')

		run('gulp', [ '--final', '--esm' ], tmp)

		expect_release(cl, tmp.partial('release/final'),
		{
			inst: { instance: 'final', name: 'fixt-backend/final' },
		})
	})

	// TODO: test target
	// xit('test target?')
})
