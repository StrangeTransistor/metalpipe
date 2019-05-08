
var is_argv = require('./is-argv')


module.exports = function is_final ()
{
	return is_argv('--final')
}
