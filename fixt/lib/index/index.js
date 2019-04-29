
import not from 'ramda/es/not'

console.log(not(false))

import '~lib/other/other'

console.log(global)

import { join } from 'path'

console.log(join('a', 'b'))

import mst from '../other/other.mst.html'

console.log(mst.render({ data: 'yes' }))
