(function (React) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

	function Foo ()
	{
		return React__default['default'].createElement('div', { class: "foo",} )
	}

	function App ()
	{
		return React__default['default'].createElement('div', { class: "app",}
	, React__default['default'].createElement(Foo, null )
	)
	}

	console.log(React__default['default'].createElement(App, null ));

	 console.log('dev');

	 console.log('test');

	debugger

}(React));
