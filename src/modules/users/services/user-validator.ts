import { Either, right, left } from '@/shared/utils/either';
import { userSchema, User, ValidatedUser } from '../types/user';
import { ErrorMessage } from '@/utils/error-message';

export const userValidator = (input: User): Either<Error, User> => {
  const result = userSchema.safeParse(input);

  if (result.success) {
    return right({ ...result.data, validated: true });
  } else {
    const errorMessages = result.error.errors
      .map((err) => `${err.path.join('.')} - ${err.message}`)
      .join(', ');
    return left(
      new Error(ErrorMessage('Validation error') + ': ' + errorMessages),
    );
  }
};
