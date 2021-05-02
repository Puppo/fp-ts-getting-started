import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import {
  CapitalLetterMissingValidationError,
  MinLengthValidationError,
  PasswordValidationError,
} from './password-errors';

export interface Password {
  _tag: 'Password';
  value: string;
  isHashed: boolean;
}

export type PasswordSpecification = {
  minLength?: number;
  capitalLetterRequired?: boolean;
};

export function of(value: string): Password {
  return { _tag: 'Password', value, isHashed: false };
}

export function fromHashed(value: string): Password {
  return { _tag: 'Password', value, isHashed: true };
}

export function validate({
  minLength = 0,
  capitalLetterRequired = false,
}: PasswordSpecification = {}) {
  return (password: Password): E.Either<PasswordValidationError, Password> => {
    if (password.value.length < minLength) {
      return E.left(MinLengthValidationError.of(minLength));
    }

    if (capitalLetterRequired && !/[A-Z]/.test(password.value)) {
      return E.left(CapitalLetterMissingValidationError.of());
    }

    return E.right({ ...password, isValidated: true });
  };
}

export type HashFn = (value: string) => E.Either<Error, string>;

export function hash(hashFn: HashFn) {
  return (password: Password): E.Either<Error, Password> =>
    pipe(
      hashFn(password.value),
      E.map(value => ({
        ...password,
        value,
        isHashed: true,
      }))
    );
}
