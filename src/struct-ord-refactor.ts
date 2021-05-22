import { pipe } from 'fp-ts/lib/function';
import * as N from 'fp-ts/number';
import { contramap, Ord, reverse } from 'fp-ts/Ord';
import { max, min } from 'fp-ts/lib/Semigroup';

console.log('---- Struct Ord  refactor ----');

const sort = <A>(O: Ord<A>) => (as: ReadonlyArray<A>): ReadonlyArray<A> =>
  as.slice().sort(O.compare);

type Player = {
  id: number;
  name: string;
  goals: number;
};

const byGoal = (direction: 'asc' | 'desc') => {
  const sortAsc = pipe(
    N.Ord,
    contramap((_: Player) => _.goals)
  );
  if (direction === 'desc') {
    return pipe(sortAsc, reverse);
  }
  return sortAsc;
};

const bomber = max(byGoal('asc'));
const pippa = min(byGoal('desc'));

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

pipe(bomber.concat(players[0], players[1]), console.log);
pipe(pippa.concat(players[0], players[1]), console.log);
pipe(players, sort(byGoal('asc')), console.log);
pipe(players, sort(byGoal('desc')), console.log);

console.log('---- Struct Ord refactor ----');
