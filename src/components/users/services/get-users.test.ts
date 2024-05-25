
import { isRight } from '@/shared/utils/either';
import { getUsers } from './get-users';


describe('UserService', () => {



  test('fetches and validates users', async () => {
    const result = await getUsers()();
    expect(isRight(result)).toBe(true);

    if (isRight(result)) {
      const users = result.value;
      expect(users.length).toBe(1);
      expect(users[0].name).toBe("Leanne Graham");
      expect(users[0].address.country).toBe("Australia");
      expect(users[0].validated).toBe(true);
    }
  });
});
