var index = (function (exports) {
	'use strict';

	function A ()
	{
		return React.createElement('div', { className: "foo",}, "Foo"
	)
	}

	function B ({ prop })
	{
		return React.createElement('div', { className:  prop ,} )
	}

	function C (props)
	{
		return React.createElement(React.Fragment, null
	, React.createElement('div', { className: "foo",} )
	, React.createElement(B, { prop:  'bar' ,  ...props ,} )
	)
	}

	exports.A = A;
	exports.B = B;
	exports.C = C;

	return exports;

})({});
