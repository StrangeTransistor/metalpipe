
var through = require('through2')

var rh = require('../util/rehash')


module.exports = function rehash (hash)
{
	return through.obj((file, encoding, done) =>
	{
		var filename = rh(file.path, hash)

		if (filename === file.path)
		{
			return done(null, file)
		}

		file = file.clone({ contents: false })
		file.path = filename

		done(null, file)
	})
}
