
var through = require('through2')


module.exports = function rename (rename_fn)
{
	return through.obj((file, encoding, done) =>
	{
		var filename = rename_fn(file.path)

		if (filename === file.path)
		{
			return done(null, file)
		}

		file = file.clone({ contents: false })
		file.path = filename

		done(null, file)
	})
}
