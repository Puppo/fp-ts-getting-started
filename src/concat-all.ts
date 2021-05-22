import { concatAll } from 'fp-ts/Monoid';
import * as S from 'fp-ts/string';
import * as N from 'fp-ts/number';
import * as B from 'fp-ts/boolean';

console.log('---- concatAll ----');

console.log(concatAll(N.MonoidSum)([1, 2, 3, 4])); // => 10
console.log(concatAll(N.MonoidProduct)([1, 2, 3, 4])); // => 24
console.log(concatAll(S.Monoid)(['a', 'b', 'c'])); // => 'abc'
console.log(concatAll(B.MonoidAll)([true, false, true])); // => false
console.log(concatAll(B.MonoidAny)([true, false, true])); // => true

console.log('---- concatAll ----');
