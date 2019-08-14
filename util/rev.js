
var { execSync: shell } = require('child_process')

/*
var format =
`
{
  "rev": "%H",
  "msg": "%s",
  "timestamp": "%cI",
  "author": "%an"
}`

format = format.replace(/\n/g, '')
format = format.replace(/"/g, '\\"')
format = `--format="${format}"`
*/


module.exports = function rev ()
{
	try
	{
		return run('git describe --always --long --abbrev=40 --dirty')
	}
	catch (e)
	{
		return null
	}
}

function run (cmd)
{
	return shell(cmd,
	{
		stdio: [ 'ignore', 'pipe', 'ignore' ],
		encoding: 'utf-8',
	})
	.trim()
}
