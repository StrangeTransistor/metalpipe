/* @flow */

import answer from 'the-answer'
console.log('answer', answer)

import noop from 'noop3'
console.log('noop', noop)

import { curry } from 'rambda/src/curry'
console.log('curry', curry)

import other from '~lib/other/other'
console.log(other)

console.log(!! global.global)

import p from 'process'
console.log(p)

var yes: string = 'yes'
console.log(yes)

/* templating: */
import mst from '../other/other.mst.html'
console.log(mst.render({ data: 'yes' }))

import pug_static from '../other/some.static.pug'
console.log(pug_static)

import pug from './index.pug'
console.log(pug({ other: 'Other', some: 'Some' }))
