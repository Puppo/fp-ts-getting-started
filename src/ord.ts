import { Ord, fromCompare } from 'fp-ts/Ord';

const OrdNumber: Ord<number> = {
  equals: (first, second) => first === second,
  compare: (first, second) => (first < second ? -1 : first > second ? 1 : 0),
};

const OrdNumberFromCompare: Ord<number> = fromCompare((first, second) =>
  first < second ? -1 : first > second ? 1 : 0
);
