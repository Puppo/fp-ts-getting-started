import * as A from 'fp-ts/Array';
import * as NEA from 'fp-ts/NonEmptyArray';

console.log('Non Empty Array');

const foo = [1, 2, 3, 4, 5];

if (A.isNonEmpty(foo)) {
  console.log(NEA.head(foo));
}
