import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

console.log('Zipped');

const foo = [1, 2, 3, 4, 5];
const bar = ['a', 'b', 'c'];

const zipped = pipe(foo, A.zip(bar));

console.log(zipped);
