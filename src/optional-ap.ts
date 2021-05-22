import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

console.log('---- Optional Ap ----');

const a: O.Option<number> = O.some(1);
const b: O.Option<string> = O.some('1');
function foo(a: number, b: string): boolean {
  return `${a}` === b;
}

const fooC = (a: number) => (b: string) => foo(a, b);

const fooCurrying = O.Monad.chain(a, a1 => O.Monad.map(b, b1 => foo(a1, b1)));
const fooOption = pipe(O.of(fooC), O.ap(a), O.ap(b));

console.log('fooCurrying', fooCurrying);
console.log('fooOption', fooOption);

function bar(a: boolean) {
  return {
    a,
  };
}

const barCurrying = pipe(
  fooOption,
  O.map(a => bar(a))
);
const barOption = pipe(O.of(bar), O.ap(fooOption));

console.log('barCurrying', barCurrying);
console.log('barOption', barOption);

console.log('---- Optional Ap ----');
