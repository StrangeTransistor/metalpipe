/* @flow */

import answer from 'the-answer'

console.log(answer)

import mod from './src/mod'

console.log(mod())

dev: console.log('dev')

final: console.log('final')

test: console.log('test')

debugger

import { dev, final, test, hash, instance, version } from '~metalpipe'
console.log({ dev, final, test, hash, instance, version })

import { custom_opt } from '~metalpipe'
console.log(custom_opt)
