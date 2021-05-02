import { flow, pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

interface Fizz {
  buzz: string;
}

interface Foo {
  bar?: Fizz;
}

const foo: Foo = {
  bar: {
    buzz: 'buzz',
  },
};

const resultOk = pipe(
  foo,
  O.fromNullable,

  O.map(({ bar }) =>
    pipe(
      bar,
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  ),
  O.flatten
);

const resultChainOk = pipe(
  foo,
  O.fromNullable,
  O.map(({ bar }) => bar),
  O.chain(
    flow(
      O.fromNullable,
      O.map(({ buzz }) => buzz)
    )
  )
);

const resultKo = pipe(
  undefined,
  O.fromNullable,
  O.map(({ bar }) => bar)
);

console.log(resultOk);
console.log(resultKo);
console.log(resultChainOk);
