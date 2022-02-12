'use strict'

function mod (s)
{
	console.log('mod', s)
}

var E1; (function (E1) { const A = 0; E1[E1.A = A] = 'A'; const B = A + 1; E1[E1.B = B] = 'B'; const C = B + 1; E1[E1.C = C] = 'C' }(E1 || (E1 = {})))
function f1 (e) { return e }
f1(E1.A)

var E2; (function (E2) { const A = 0; E2[E2.A = A] = 'A'; const B = A + 1; E2[E2.B = B] = 'B'; const C = B + 1; E2[E2.C = C] = 'C' }(E2 || (E2 = {})))
function f2 (e) { return e }
f2(E2.A)

module.exports = mod
