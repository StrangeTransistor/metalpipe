import noop from 'noop3';
import answer from 'the-answer';
import mod from './src/mod.js';
import './src/mod2.js';

const custom_opt = "HASH_0.0.0";
const version = "0.0.0";
const final = true;
const dev = false;
const test = false;
const hash = null;
const instance = "final";

console.log(noop());

console.log(answer);

console.log(mod());

function async_import ()
{
	import('./src/mod.js').then(({ default: mod }) => console.log(mod));

	import('the-answer').then(({ default: answer }) => console.log(answer));
}

async_import();

console.log('final');
console.log({ dev, final, test, hash, instance, version });
console.log(custom_opt);
