import { pipe, flow } from 'fp-ts/function';
import * as N from 'fp-ts/number';
import { Ord, reverse } from 'fp-ts/Ord';

console.log('---- Min Max ----');

const min = <A>(O: Ord<A>) => (second: A) => (first: A) =>
  O.compare(first, second) === 1 ? second : first;

pipe(3, min(N.Ord)(1), console.log);

const max = flow(reverse, min);

pipe(3, max(N.Ord)(1), console.log);

console.log('---- Min Max ----');
