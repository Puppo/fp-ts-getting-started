import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

console.log('Lookup');

const some = pipe([1, 2, 3], A.lookup(1));
const none = pipe([1, 2, 3], A.lookup(3));

console.log(some);
console.log(none);
