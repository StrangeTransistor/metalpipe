
var { execSync: run } = require('child_process')

module.exports = (cmd, tmp) =>
{
	return run(cmd, { cwd: tmp() })
}
