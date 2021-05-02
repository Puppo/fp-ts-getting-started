import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

function begin(): Promise<void> {
  console.log('begin');
  return Promise.reject();
}
function commit(): Promise<void> {
  console.log('commit');

  return Promise.resolve();
}
function rollback(): Promise<void> {
  console.log('rollback');

  return Promise.resolve();
}

const result = pipe(
  TE.tryCatch(
    () => begin(),
    err => new Error(`begin txn failed: ${err}`)
  ),
  TE.chain(() =>
    TE.tryCatch(
      () => commit(),
      err => new Error(`commit txn failed: ${err}`)
    )
  ),
  TE.orElse(originalError =>
    pipe(
      TE.tryCatch(
        () => rollback(),
        err => new Error(`rollback txn failed: ${err}`)
      ),
      TE.fold(TE.left, () => TE.left(originalError))
    )
  )
);

(async () => {
  await result();
})();
