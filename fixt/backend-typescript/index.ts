
import noop from 'noop3'

console.log(noop())

import answer from 'the-answer'

console.log(answer)

import mod from './src/mod'

import './src/mod2'

console.log(mod())

function async_import ()
{
	import('./src/mod.js').then(({ default: mod }) => console.log(mod))

	import('the-answer').then(({ default: answer }) => console.log(answer))
}

async_import()

dev: console.log('dev')

final: console.log('final')

test: console.log('test')

debugger

import { dev, final, test, hash, instance, version } from '~metalpipe'
console.log({ dev, final, test, hash, instance, version })

import { custom_opt } from '~metalpipe'
console.log(custom_opt)
