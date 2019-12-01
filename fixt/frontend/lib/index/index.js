/* @flow */

import answer from 'the-answer'
console.log('answer', answer)

import noop from 'noop3'
console.log('noop', noop)

import { curry } from 'rambda/src/curry'
console.log('curry', curry)

import other from '~lib/other/other'
console.log(other)

import cjs from '~lib/other/cjs'
console.log(cjs)

import json from '~lib/other/other.json'
console.log(json)


import { dev } from '~metalpipe'
function debug (...args)
{
	dev && console.log(...args)
}
console.log(dev)
debug(1, 2, 3)

console.log(!! global.global)

import p from 'process'
console.log(p)

type Foo = { yes: string }

var foo: Foo = { yes: 'yes' }
console.log(foo)

/* templating: */
import mst from '~lib/other/other.mst.html'
console.log(mst.render({ data: 'yes' }))

import pug_static from '~lib/other/some.static.pug'
console.log(pug_static)

import pug from './index.pug'
console.log(pug({ other: 'Other', some: 'Some' }))
