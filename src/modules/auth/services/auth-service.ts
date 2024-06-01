import { Either, left, isLeft, right } from '@/shared/utils/either';
import { TaskEither, taskEither } from '@/shared/utils/task-either';
import { AuthResponse, AuthUser, AuthUserSchema } from '../types/auth';
import fetchData from '@/shared/utils/fetch-data';
import { ErrorMessage } from '@/shared/components/error-message';

const AUTH_URL = 'https://jsonplaceholder.typicode.com/users';

const validateUser = (input: any): Either<Error, AuthUser> => {
  const result = AuthUserSchema.safeParse(input);
  return result.success
    ? right(result.data)
    : left(new Error('Validation error'));
};

const adapter = (
  input: any,
  email: string,
): TaskEither<Error, AuthResponse> => {
  const adaptTask: TaskEither<Error, AuthResponse> = async () => {
    try {
      const users = input as any[];
      const user = users.find((user) => user.email === email);

      if (!user) {
        return left(new Error(ErrorMessage('User not found')));
      }

      const validation = validateUser(user);
      if (isLeft(validation)) {
        return left(
          new Error(
            ErrorMessage('Validation error') + ': ' + validation.value.message,
          ),
        );
      }

      return right({ success: true, user: validation.value });
    } catch (error) {
      return left(
        new Error(
          ErrorMessage('Failed to adapt user') +
            ': ' +
            (error as Error).message,
        ),
      );
    }
  };

  return taskEither(adaptTask);
};

export const authenticateUser = (
  email: string,
): TaskEither<Error, AuthResponse> => {
  return fetchData<AuthResponse>(
    AUTH_URL,
    (input: any) => adapter(input, email),
    (response: AuthResponse) => right(response),
    'GET',
    {},
  );
};
