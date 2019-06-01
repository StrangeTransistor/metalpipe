
// var { expect } = require('chai')
var origin = require('../origin')
var run = require('../run')


describe('Frontend', () =>
{
	it('dev', () =>
	{
		var tmp = origin('frontend')

		run('gulp --once', tmp)

		console.log(1)
	})

	xit('final', () =>
	{
	})
})
