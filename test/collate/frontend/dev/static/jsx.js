(function (React) {
	'use strict';

	function Foo ()
	{
		return React.createElement('div', { class: "foo",} )
	}

	function App ()
	{
		return React.createElement('div', { class: "app",}
	, React.createElement(Foo, null )
	)
	}

	console.log(React.createElement(App, null ));

	console.log('dev');

	console.log('test');

	debugger

})(React);
