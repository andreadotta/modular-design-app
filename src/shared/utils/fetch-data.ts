import { Either, left, right, isRight, isLeft } from './either';
import { TaskEither, Task, taskEither } from './task-either';

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetchData<O>(
  url: string,
  adapter: (input: any) => TaskEither<Error, O>,
  validator: (input: O) => Either<Error, O>,
  method: FetchMethod = 'GET',
  headers: Record<string, string> = {},
  body?: string,
): TaskEither<Error, O> {
  const fetchTask: Task<Either<Error, O>> = async () => {
    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        return left(new Error('Request error'));
      }

      const res = await response.json();
      const adapted = await adapter(res)();

      if (isLeft(adapted)) {
        return adapted;
      }

      const validated = validator(adapted.value);

      if (isLeft(validated)) {
        return left(validated.value);
      }

      return right(validated.value);
    } catch (error: any) {
      return left(new Error('Request error: ' + error.message));
    }
  };

  return taskEither(fetchTask);
}

export default fetchData;
