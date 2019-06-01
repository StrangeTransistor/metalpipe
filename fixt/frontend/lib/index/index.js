
import not from 'ramda/es/not'

console.log('not', not(false))

import '~lib/other/other'

console.log(!! global.global)

import { join } from 'path'

console.log(join('a', 'b'))

import mst from '../other/other.mst.html'

console.log(mst.render({ data: 'yes' }))

import pug_s from '../other/some.static.pug'

console.log(pug_s)

import pug from './index.pug'

console.log(pug({ other: 'Other', some: 'Some' }))

var x: string = 'yes'

console.log(x)
