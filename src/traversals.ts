import A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';

console.log('---- Traversals ----');

const getPartIds = (): TE.TaskEither<Error, string[]> => {
  const res = ['123', '456', '789'];
  return TE.right(res);
};
const getPart = (partId: string): TE.TaskEither<Error, Buffer> => {
  return TE.right(Buffer.from(partId, 'utf8'));
};

async function run() {
  await pipe(
    getPartIds(),
    TE.chain(A.traverse(TE.Monad)(getPart)),
    TE.fold(
      e => {
        console.log('Error', e);
        return TE.left(e);
      },
      buffers => {
        for (const item of buffers) {
          console.log(item.toString('utf-8'));
        }
        return TE.right(buffers);
      }
    )
  )();
}

run().finally(() => {
  console.log('---- Traversals ----');
});
