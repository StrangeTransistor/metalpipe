
var { spawnSync: run } = require('child_process')

module.exports = (cmd, args, tmp) =>
{
	return run(cmd, [ '-L', ...args ], { cwd: tmp(), stdio: 'inherit' })
}
