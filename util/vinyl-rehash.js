
var through = require('through2')

var rehash = require('../util/rehash')


module.exports = function vinyl_rehash (hash)
{
	return through.obj((file, encoding, done) =>
	{
		var filename = rehash(file.path, hash)

		if (filename === file.path)
		{
			return done(null, file)
		}

		file = file.clone({ contents: false })
		file.path = filename

		done(null, file)
	})
}
