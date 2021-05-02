import { flow, pipe } from 'fp-ts/lib/function';
import * as Password from './password';
import crypto from 'crypto';
import * as E from 'fp-ts/lib/Either';

const pipeline = flow(
  Password.of,
  Password.validate({ minLength: 8, capitalLetterRequired: true }),
  E.chainW(
    Password.hash(value =>
      E.right(
        crypto
          .createHash('md5')
          .update(value)
          .digest('hex')
      )
    )
  )
);

console.log(pipe('pw123', pipeline));
console.log(pipe('Password123', pipeline));
