import axios from 'axios';
import { absurd, constVoid, pipe, unsafeCoerce } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';

type Resp = { code: number; description: string };

const httpRequest = async (status: number) => {
  const httpResponse = await pipe(
    TE.tryCatch(
      () => axios.get(`https://httpstat.us/${status}`),
      reason => new Error(`${reason}`)
    ),
    TE.map(resp => resp.data)
  )();

  console.log(httpResponse);
};

const result = pipe(
  TE.tryCatch(
    () => axios.get('https://httpstat.us/200'),
    () => constVoid() as never
  ),
  TE.map(resp => unsafeCoerce<unknown, Resp>(resp.data)),
  TE.fold(absurd, T.of)
);

(async () => {
  result();
  await httpRequest(200);
  await httpRequest(500);
})();
