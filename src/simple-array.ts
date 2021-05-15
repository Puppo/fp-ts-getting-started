import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

console.log('Simple Array');

const foo = [1, 2, 3, 4, 5];

const sum = pipe(
  A.Monad.map(foo, x => x - 1),
  A.filter(x => x % 2 === 0),
  A.reduce(0, (prev, next) => prev + next)
);
console.log(sum);
