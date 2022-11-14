import answer from 'the-answer';
import mod from "./src/mod.js";
console.log(answer);
console.log(mod());
function async_import() {
  import('./src/mod.js').then(({
    default: mod
  }) => console.log(mod));
  import('the-answer').then(({
    default: answer
  }) => console.log(answer));
}
async_import();
console.log('final');