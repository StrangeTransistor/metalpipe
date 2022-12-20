
type Foo = { yes: string }

var foo: Foo = { yes: 'yes' }
console.log(foo)

import other from '~lib/other/other'
console.log('other', other)

import cjs from '~lib/other/cjs'
console.log('cjs', cjs)

import json from '../other/other.json'
console.log('json', json)


/* node_modules */
import answer from 'the-answer'
console.log('answer', answer)

import noop from 'noop3'
console.log('noop', noop)

import { curry } from 'rambda/src/curry'
console.log('curry', curry)


/* node */
console.log('global', !! global.global)

import p from 'process'
console.log('process', p)


/* templating: */
import mst from '../other/other.mst.html'
console.log(mst.render({ data: 'yes' }))

import pug_static from '../other/some.static.pug'
console.log(pug_static)

import pug from '../other2/other2.pug'
console.log(pug({ other: 'Other', some: 'Some' }))


/* metalpipe */
import { dev } from '~metalpipe'
function debug (...args: any[])
{
	dev && console.log(...args)
}
console.log('~metalpipe/dev', dev)
debug(1, 2, 3)

import { final, test, hash, instance, version } from '~metalpipe'
console.log({ final, test, hash, instance, version })

console.log(process.env.NODE_ENV)

dev: console.log('dev')

final: console.log('final')

test: console.log('test')

debugger
