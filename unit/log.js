
var { obj: through } = require('through2')


module.exports = function log (log = console.debug)
{
	return through((file, _, done) =>
	{
		// https://github.com/gulpjs/vinyl#instance-properties
		log(file.relative)

		done(null, file)
	})
}
