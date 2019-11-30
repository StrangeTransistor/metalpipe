
var ext = require('replace-ext')

var rename = require('./rename')


module.exports = function js_ext ()
{
	return rename(path => ext(path, '.js'))
}
