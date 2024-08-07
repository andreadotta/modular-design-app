import { isRight, left, right } from '@/utils/either';
import { getUsers } from './get-users';
import { TaskEither, taskEither } from '@/utils/task-either';
import { ErrorMessage } from '@/utils/error-message';

// const mockGeoService = (
//   lat: string,
//   lon: string,
// ): TaskEither<Error, string> => {
//   return taskEither(() =>
//     Promise.resolve(
//       lat === '-37.3159' && lon === '81.1496'
//         ? right('Australia')
//         : left(new Error(ErrorMessage('Country not found'))),
//     ),
//   );
// };

describe('UserService', () => {
  test('fetches and validates users', async () => {
    const result = await getUsers()();
    expect(isRight(result)).toBe(true);

    if (isRight(result)) {
      const users = result.value;
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('Leanne Graham');
      expect(users[0].address.country).toBe('Australia');
    }
  });
});
