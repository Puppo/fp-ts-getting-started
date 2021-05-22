import { sequenceS } from 'fp-ts/Apply';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

console.log('---- SequenceS ----');

type RegisterInput = {
  email: string;
  password: string;
};

function validateEmail(email: string): E.Either<Error, string> {
  if (!email.includes('@')) return E.left(new Error('Email invalid'));
  return E.right(email);
}
function validatePassword(password: string): E.Either<Error, string> {
  if (password.length < 2)
    return E.left(new Error('Password length less than 2'));
  else return E.right(password);
}
function register(input: RegisterInput): boolean {
  console.log('register', input);
  return Boolean(input.email) && Boolean(input.password);
}

const input: RegisterInput = {
  email: 'pippo@pippo.it',
  password: 'pass',
};

const registerResult = pipe(
  input,
  ({ email, password }) =>
    sequenceS(E.Monad)({
      email: validateEmail(email),
      password: validatePassword(password),
    }),
  E.map(register)
);

console.log('register', registerResult);

console.log('---- SequenceS ----');
