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

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

}({}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmRvbS5qcyIsInNvdXJjZXMiOlsiLi4vbGliL2luZGV4L3Zkb20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZnVuY3Rpb24gQSAoKVxue1xuXHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9J2Zvbyc+Rm9vXG5cdDwvZGl2PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQiAoeyBwcm9wIH0pXG57XG5cdHJldHVybiA8ZGl2IGNsYXNzTmFtZT17IHByb3AgfSAvPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQyAocHJvcHMpXG57XG5cdHJldHVybiA8PlxuXHRcdDxkaXYgY2xhc3NOYW1lPSdmb28nIC8+XG5cdFx0PEIgcHJvcD17ICdiYXInIH0geyAuLi5wcm9wcyB9IC8+XG5cdDwvPlxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Q0FFQTtDQUNBO0NBQ0E7Q0FDQTtBQUNBOztDQUVBO0NBQ0E7Q0FDQTtBQUNBOztDQUVBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Ozs7Ozs7Ozs7Ozs7In0=
