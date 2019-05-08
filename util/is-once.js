
var is_argv = require('./is-argv')


module.exports = function is_once ()
{
	return is_argv('--once')
}
