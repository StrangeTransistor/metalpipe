
var yes: string = 'yes'
console.log(yes)

import other from '../other/other'
console.log('other', other)

import cjs from '../other/cjs'
console.log('cjs', cjs)

import json from '../other/other.json'
console.log(json)


/* node_modules */
import answer from 'the-answer'
console.log('answer', answer)

import noop from 'noop3'
console.log('noop', noop)

import { curry } from 'rambda/src/curry'
console.log('curry', curry)


/* node */
console.log(!! global.global)

import p from 'process'
console.log(p)
