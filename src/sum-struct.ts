import { pipe } from 'fp-ts/function';
import { concatAll, Monoid, struct } from 'fp-ts/Monoid';
import * as N from 'fp-ts/number';

console.log('---- sum struct ----');

type Point = {
  readonly x: number;
  readonly y: number;
};

const MonoidPointSum: Monoid<Point> = struct({
  x: N.MonoidSum,
  y: N.MonoidSum,
});

pipe(
  concatAll(MonoidPointSum)([
    { x: 1, y: 1 },
    { x: 3, y: 4 },
  ]),
  console.log
);

console.log('---- sum struct ----');
