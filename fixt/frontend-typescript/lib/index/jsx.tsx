
import React from 'react'

import Foo from '~lib/other/jsx'

function App ()
{
	return <div class='app'>
		<Foo />
	</div>
}

console.log(<App />)

dev: console.log('dev')

final: console.log('final')

test: console.log('test')

debugger
