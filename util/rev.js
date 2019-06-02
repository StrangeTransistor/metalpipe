
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
	return run('git describe --always --long --abbrev=40 --dirty')

	/*
	var
	R = run(`git log -1 ${ format }`)
	R = loadc(R)
	R.rev = run('git describe --always --long --abbrev=40 --dirty')

	return R
	*/
}

function run (cmd, options = {})
{
	return shell(cmd, { ...options, encoding: 'utf-8' })
	.trim()
}
