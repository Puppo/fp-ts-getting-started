import { Monoid } from 'fp-ts/Monoid';

const MonoidSum: Monoid<number> = {
  concat: (a, b) => a + b,
  empty: 0,
};

const MonoidProduct: Monoid<number> = {
  concat: (a, b) => a * b,
  empty: 0,
};

const MonoidString: Monoid<string> = {
  concat: (a, b) => a + b,
  empty: '',
};

const MonoidAll: Monoid<boolean> = {
  concat: (a, b) => a && b,
  empty: true,
};

const MonoidAny: Monoid<boolean> = {
  concat: (a, b) => a || b,
  empty: false,
};
