
var { existsSync: exists } = require('fs')


module.exports = ({ $root }) =>
{
	return exists($root('tsconfig.json'))
}
