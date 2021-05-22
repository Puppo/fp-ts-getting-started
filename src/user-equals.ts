import { Eq, struct, contramap } from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';
import * as S from 'fp-ts/string';

console.log('---- user equals ----');

type User = {
  readonly id: number;
  readonly name: string;
};

const EqStandard: Eq<User> = struct({
  id: N.Eq,
  name: S.Eq,
});

const EqID: Eq<User> = pipe(
  N.Eq,
  contramap((_: User) => _.id)
);

console.log(
  EqStandard.equals({ id: 1, name: 'Luca' }, { id: 1, name: 'Luca Del Puppo' })
);

console.log(
  EqStandard.equals(
    { id: 1, name: 'Luca Del Puppo' },
    { id: 1, name: 'Luca Del Puppo' }
  )
);

console.log(
  EqID.equals({ id: 1, name: 'Luca' }, { id: 1, name: 'Luca Del Puppo' })
);

console.log(EqID.equals({ id: 1, name: 'Luca' }, { id: 2, name: 'Luca' }));

console.log('---- user equals ----');
