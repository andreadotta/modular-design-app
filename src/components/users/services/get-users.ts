import { Either, left, isRight, isLeft, right } from '@/shared/utils/either';
import { TaskEither, taskEither } from '@/shared/utils/task-either';
import { ValidatedUser } from '..';
import { userAdapter } from './user-adapter';
import { userValidator } from './user-validator';
import { GeoServiceFunction } from '../types/user';
import { ErrorMessage } from '@/shared/components/error-message';

export const getUsers = (
  geoService: GeoServiceFunction,
): TaskEither<Error, ValidatedUser[]> => {
  const fetchUsers = async (): Promise<Either<Error, ValidatedUser[]>> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      return left(new Error(ErrorMessage('Request error')));
    }

    const users: any[] = await response.json();
    const adaptedUsers = await Promise.all(
      users.map((user) => userAdapter(user, geoService)()),
    );
    const validUsers = adaptedUsers.map((result) => {
      if (isRight(result)) {
        return userValidator(result.value);
      }
      return result;
    });

    const errors = validUsers.filter(isLeft);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => (err as { _tag: 'Left'; value: Error }).value.message)
        .join('; ');
      return left(new Error(ErrorMessage('Validation error')));
    }
    return right(
      validUsers.map(
        (result) => (result as { _tag: 'Right'; value: ValidatedUser }).value,
      ),
    );
  };

  return taskEither(fetchUsers);
};
