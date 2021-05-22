import { sequenceT } from 'fp-ts/Apply';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

console.log('---- SequenceT ----');

const arr = [1, 2, 3].map(O.of);
const res = A.Traversable.sequence(O.Monad)(arr);

console.log('Simple sequence', res);

//  Option<[number, string]>
sequenceT(O.Monad)(O.of(123), O.of('asdf'));

function foo(a: number, b: string): boolean {
  return `${a}` === b;
}
function bar(a: boolean) {
  return {
    a,
  };
}

// Option<object>
const sequence = pipe(
  sequenceT(O.Monad)(O.of(123), O.of('asdf')),
  O.map(args => foo(...args)),
  O.map(bar)
);

console.log('sequence', sequence);

console.log('---- SequenceT ----');
