import { pipe } from 'fp-ts/function';
import { concatAll, Monoid, tuple } from 'fp-ts/Monoid';
import * as N from 'fp-ts/number';

console.log('---- sum ----');

type Point = readonly [number, number];

const MonoidPointSum: Monoid<Point> = tuple(N.MonoidSum, N.MonoidSum);

pipe(
  concatAll(MonoidPointSum)([
    [1, 1],
    [3, 4],
  ]),
  console.log
);

console.log('---- sum ----');
