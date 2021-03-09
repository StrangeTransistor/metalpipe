
type Specific = { s: boolean }
export type External = { e?: number }

export default function mod (s: Specific)
{
	console.log('mod', s)
}

enum E1 { A, B, C }
function f1 (e: E1) { return e }
f1(E1.A)

const enum E2 { A, B, C }
function f2 (e: E2) { return e }
f2(E2.A)
