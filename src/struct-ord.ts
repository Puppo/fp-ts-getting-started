import { pipe } from 'fp-ts/lib/function';
import * as N from 'fp-ts/number';
import { Ord, contramap } from 'fp-ts/Ord';
import { Semigroup } from 'fp-ts/lib/Semigroup';

console.log('---- Struct Ord ----');

type Player = {
  id: number;
  name: string;
  goals: number;
};

// const byGoalAsc: Ord<Player> = fromCompare((first, second) =>
//   N.Ord.compare(first.goals, second.goals)
// );

const byGoalAsc = pipe(
  N.Ord,
  contramap((_: Player) => _.goals)
);

const bomber = <A>(O: Ord<A>) => (a: A) => (b: A) =>
  O.compare(a, b) === 1 ? a : b;

const players: ReadonlyArray<Player> = [
  {
    id: 1,
    name: 'Cr7',
    goals: 28,
  },
  {
    id: 2,
    name: 'Lukaku',
    goals: 21,
  },
];

pipe(players[0], bomber(byGoalAsc)(players[1]), console.log);

const minGoal = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: (first, second) => (O.compare(first, second) === 1 ? first : second),
});

const maxGoal = <A>(O: Ord<A>): Semigroup<A> => ({
  concat: (first, second) => (O.compare(first, second) === 1 ? second : first),
});

pipe(minGoal(byGoalAsc).concat(players[0], players[1]), console.log);
pipe(maxGoal(byGoalAsc).concat(players[0], players[1]), console.log);

console.log('---- Struct Ord ----');
