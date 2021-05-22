import { Eq } from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';

console.log('---- number equals ----');

// restituisce `true` se l'elemento `a` compare nella lista `as`
const elem = <A>(E: Eq<A>) => (a: A) => (as: ReadonlyArray<A>): boolean =>
  as.some(e => E.equals(a, e));

const nElem = elem(N.Eq);

const list = [1, 2, 3];

pipe(list, nElem(2), console.log); // => true
pipe(list, nElem(4), console.log); // => false

console.log('---- number equals ----');
