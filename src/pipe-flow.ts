import { flow, pipe } from 'fp-ts/function';

const add = (num: number): number => num + 1;

const multiply = (num: number): number => num * 2;

const toString = (num: number) => `${num}`;

const contact = (a: number, trasformer: (a: number) => string) => [
  a,
  trasformer(a),
];

console.log('pipe', pipe(1, add, multiply, toString));

console.log('flow', flow(add, multiply, toString)(1));

console.log(
  'pipe concat',
  contact(1, n => pipe(n, add, multiply, toString))
);

console.log(
  'pipe concat',
  contact(1, n => flow(add, multiply, toString)(n))
);
