
var { src } = require('gulp')
var { dest: dst } = require('gulp')

import live from '../util/live'


export default function copy ({ from, to })
{
	return live(from, function copy$ ()
	{
		return src(from)
		.pipe(dst(to))
	})
}
