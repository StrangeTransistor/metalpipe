
var { expect } = require('chai')

var hash = require('../../util/hash-stamp').in_uri


describe('hash-stamp', () =>
{
	var H = 'ABCDEFG'

	it('works', () =>
	{
		var uris =
		{
			'/static/index.css': '/static/index.ABCDEFG.css',
			'/static/index.js': '/static/index.ABCDEFG.js',
			'static/index.js': 'static/index.ABCDEFG.js',
			'/static/assets/foo/bar.jpg': '/static/assets.ABCDEFG/foo/bar.jpg',
			'static/assets/foo/bar.jpg': 'static/assets.ABCDEFG/foo/bar.jpg',
			'/api/get.js': '/api/get.js',
			'http://d.org/api/get/': 'http://d.org/api/get/',
		}

		for (var uri in uris)
		{
			var uri_h = hash(H, uri)

			expect(uri_h).eq(uris[uri])
		}
	})
})
