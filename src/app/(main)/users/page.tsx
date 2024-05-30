import { getUsers, User } from '@/modules/users';
import { isRight } from '@/shared/utils/either';
import UsersContainer from '@/components/containers/users/user-container';
import { getCountryFromCoordinates } from '@/modules/geo';

async function fetchInitialData(): Promise<User[]> {
  const result = await getUsers(getCountryFromCoordinates)();
  console.log('User page', 'fetchInitialData');

  if (isRight(result)) {
    const data = result.value;

    if (Array.isArray(data)) {
      return data.slice(0, 8);
    } else {
      console.error('Data is not an array:', data);
      return [];
    }
  } else {
    console.error('Fetching users failed:', result);
    return [];
  }
}

export const revalidate = 900;

export default async function Page() {
  const initialData = await fetchInitialData();
  return <UsersContainer initialData={initialData} />;
}
