
var { src } = require('gulp')
var { dest: dst } = require('gulp')

import live from '../util/live'
import fnom from '../util/fnom'


export default function copy ({ from, to, name })
{
	name || (name = 'copy$')

	return live(from, fnom(name, () =>
	{
		return src(from)
		.pipe(dst(to))
	}))
}
