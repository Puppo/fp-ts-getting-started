import { Eq, struct, tuple } from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';

console.log('---- point equals ----');

type PointStruct = {
  x: number;
  y: number;
};

const elem = <A>(E: Eq<A>) => (a: A) => (as: ReadonlyArray<A>): boolean =>
  as.some(e => E.equals(a, e));

const EqPoint: Eq<PointStruct> = {
  equals: (a, b) => a.x === b.x && a.y === b.y,
};

const points: ReadonlyArray<PointStruct> = [
  { x: 1, y: 2 },
  { x: 1, y: 1 },
];

console.log('point equal', EqPoint.equals({ x: 1, y: 1 }, { x: 1, y: 1 }));
console.log('point not equal', EqPoint.equals({ x: 1, y: 1 }, { x: 1, y: 2 }));

console.log('points includes', pipe(points.includes({ x: 1, y: 1 })));
console.log(
  'points includes eq',
  pipe(pipe(points, elem(EqPoint)({ x: 1, y: 1 })))
);
console.log(
  'points includes not eq',
  pipe(pipe(points, elem(EqPoint)({ x: 1, y: 3 })))
);

const EqStructPoint: Eq<PointStruct> = struct({
  x: N.Eq,
  y: N.Eq,
});

console.log(
  'points struct includes eq',
  pipe(pipe(points, elem(EqStructPoint)({ x: 1, y: 1 })))
);
console.log(
  'points struct includes not eq',
  pipe(pipe(points, elem(EqStructPoint)({ x: 1, y: 3 })))
);

type PointTuple = [number, number];

const pointsTuple: ReadonlyArray<PointTuple> = [
  [1, 2],
  [1, 1],
];

const EqTuplePoint: Eq<PointTuple> = tuple(N.Eq, N.Eq);

console.log(
  'points tuple includes eq',
  pipe(pipe(pointsTuple, elem(EqTuplePoint)([1, 1])))
);
console.log(
  'points tuple includes not eq',
  pipe(pipe(pointsTuple, elem(EqTuplePoint)([1, 3])))
);

console.log('---- point equals ----');
