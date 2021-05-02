import * as T from 'fp-ts/lib/Task';

const foo = 'asdf'; // string
const taskBar = T.of(foo); // T.Task<string>

// Same As
const promiseBar: T.Task<string> = () => Promise.resolve(foo);

(async function() {
  console.log('taskBar', await taskBar());
  console.log('promiseBar', await promiseBar());
})();
