import { getUsers, User } from '@/modules/users';
import { isRight } from '@/shared/utils/either';
import UsersContainer from '@/containers/users/user-container';

/**
 * Fetches the initial data of users from the server.
 *
 * This function calls the `getUsers` function to retrieve user data.
 * It then validates the response and ensures it is an array of users.
 * Only the first 8 users are returned. If the data is not an array or
 * if the fetching fails, it logs an error and returns an empty array.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 */
async function fetchInitialData(): Promise<User[]> {
  const result = await getUsers()();
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
/**
 * Revalidation interval for the page in seconds.
 * This determines how frequently the page data should be revalidated.
 */
export const revalidate = 900;
/**
 * The main page component that fetches initial user data on the server-side
 * and renders the `UsersContainer` component with the fetched data.
 *
 * @returns The UsersContainer component with initial data and token.
 */
export default async function Page() {
  const initialData = await fetchInitialData();
  return <UsersContainer initialData={initialData} token="" />;
}
