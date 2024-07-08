import { isRight, right, left, Either, isLeft } from '@/shared/utils/either';
import { taskEither, TaskEither } from '@/shared/utils/task-either';
import { userAdapter } from './user-adapter';

import { CountryFromCoordinates, User } from '../types/user';
import { ErrorMessage } from '@/utils/error-message';
import fetchData from '@/shared/utils/fetch-data';
import { userValidator } from './user-validator';
import { getCountryFromCoordinates } from '@/geo';

export const getUsers = (): TaskEither<Error, User[]> => {
  const geoService = getCountryFromCoordinates;
  const validateUsers = (users: User[]): Either<Error, User[]> => {
    const validatedUsers = users.map(userValidator);
    const errors = validatedUsers.filter(isLeft);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => (err as { _tag: 'Left'; value: Error }).value.message)
        .join('; ');
      return left(new Error(ErrorMessage('Validation error') + errorMessages));
    }
    return right(
      validatedUsers.map(
        (result) => (result as { _tag: 'Right'; value: User }).value,
      ),
    );
  };
  const adapter = (
    input: any,
    geoService: CountryFromCoordinates,
  ): TaskEither<Error, User[]> => {
    const adaptTask: TaskEither<Error, User[]> = async () => {
      try {
        const users = input as any[];
        const adaptedUsers = await Promise.all(
          users.map(async (user) => {
            const adaptedUser = await userAdapter(user, geoService)();
            if (isRight(adaptedUser)) {
              return adaptedUser.value;
            }
            throw new Error(adaptedUser.value.message);
          }),
        );
        return right(adaptedUsers);
      } catch (error) {
        return left(
          new Error(
            ErrorMessage('Failed to adapt users') +
              ': ' +
              (error as Error).message,
          ),
        );
      }
    };

    return taskEither(adaptTask);
  };

  return fetchData<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    (input: any) => adapter(input, geoService),
    validateUsers,
    'GET',
    {},
  );
};
