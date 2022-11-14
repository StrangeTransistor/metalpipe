import React from 'react';
function Foo() {
  return React.createElement('div', {
    class: "foo"
  });
}
console.log('final');
export { Foo as default };