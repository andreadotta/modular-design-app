import { getUsers } from '@/users/services/get-users';
import { ValidatedUser } from '@/users/types/user';
import { isRight } from '@/shared/utils/either';
import UsersScreen from '@/components/users/ui/users-screen';

async function fetchInitialData(): Promise<ValidatedUser[]> {
  const result = await getUsers()();
  const data = isRight(result) ? result.value : [];
  return data.slice(0, 8); // only 8 users to test
}

export default async function Page() {
  const initialData = await fetchInitialData();

  return <UsersScreen initialData={initialData} />;
}
