import * as A from 'fp-ts/Array';
import * as M from 'fp-ts/Monoid';
import { MonoidSum } from 'fp-ts/number';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { Semigroup } from 'fp-ts/Semigroup';

console.log('Non Homogeneous');

const semigroupMax: Semigroup<number> = {
  concat: Math.max,
};

const monoidMax: M.Monoid<number> = {
  concat: semigroupMax.concat,
  empty: Number.NEGATIVE_INFINITY,
};

type Foo = {
  readonly _tag: 'Foo';
  readonly f: () => number;
};

type Bar = {
  readonly _tag: 'Bar';
  readonly g: () => number;
};

function compute(arr: Array<Foo | Bar>) {
  return pipe(
    A.Filterable.partitionMap(arr, a => {
      return a._tag === 'Foo' ? E.left(a) : E.right(a);
    }),
    ({ left: foos, right: bars }) => {
      const sum = A.Foldable.foldMap(MonoidSum)(foos, foo => foo.f());
      const max = A.Foldable.foldMap(monoidMax)(bars, bar => bar.g());

      return sum * max;
    }
  );
}

console.log(
  compute([
    {
      _tag: 'Foo',
      f: () => 1,
    },
    {
      _tag: 'Bar',
      g: () => 3,
    },
  ])
);
