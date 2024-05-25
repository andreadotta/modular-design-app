import { Either, left } from './either';
import { TaskEither, Task, taskEither } from './task-either';

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetchData<I, O>(
  url: string,
  adapter: (input: any) => I,
  validator: (input: I) => Either<Error, O>,
  method: FetchMethod = 'GET',
  headers: Record<string, string> = {},
  body?: string,
  mock?: any
): TaskEither<Error, O> {
  const fetchTask: Task<Either<Error, any>> = async () => {
    try {
      // if (mock) {
      //   const adapted: I = adapter(mock);
      //   const validation = validator(adapted);
      //   return validation;
      // }

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        return left(new Error('Request error'));
      }
     

      const res: any = await response.json();
      const adapted: I = adapter(res);
      const validation = validator(adapted);
      return validation;
    } catch (error: any) {
      return left(new Error('Request error: ' + error.message));
    }
  };

  return taskEither(fetchTask);
}


export default fetchData