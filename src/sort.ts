import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';
import { Ord } from 'fp-ts/Ord';

console.log('---- Sort ----');

const sort = <A>(O: Ord<A>) => (as: ReadonlyArray<A>): ReadonlyArray<A> =>
  as.slice().sort(O.compare);

pipe([3, 1, 2], sort(N.Ord), console.log);

console.log('---- Sort ----');
