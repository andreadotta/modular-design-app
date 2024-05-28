import { Either, left, isRight, isLeft, right } from '@/shared/utils/either';
import { TaskEither, taskEither } from '@/shared/utils/task-either';
import { AuthResponse, AuthUser, AuthUserSchema } from '../types/auth';
import { ErrorMessage } from '@/shared/components/error-message';

const AUTH_URL = 'https://jsonplaceholder.typicode.com/users';

const validateUser = (input: any): Either<Error, AuthUser> => {
  const result = AuthUserSchema.safeParse(input);
  return result.success
    ? right(result.data)
    : left(new Error('Validation error'));
};

export const authenticateUser = (
  email: string,
): TaskEither<Error, AuthResponse> => {
  const fetchUser = async (): Promise<Either<Error, AuthResponse>> => {
    const response = await fetch(AUTH_URL);
    if (!response.ok) {
      return left(new Error(ErrorMessage('Request error')));
    }

    const users: any[] = await response.json();
    const user = users.find((user) => user.email === email);

    if (!user) {
      return left(new Error(ErrorMessage('User not found')));
    }

    const validation = validateUser(user);
    if (isLeft(validation)) {
      return left(new Error('Validation error: ' + validation.value.message));
    }

    return right({ success: true, user: validation.value });
  };

  return taskEither(fetchUser);
};
