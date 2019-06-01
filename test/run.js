
var { spawnSync: run } = require('child_process')

module.exports = (cmd, args, tmp) =>
{
	return run(cmd, args, { cwd: tmp(), stdio: 'inherit' })
}
