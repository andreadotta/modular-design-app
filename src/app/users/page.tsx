import { getUsers, User } from '@/users';
import { isRight } from '@/shared/utils/either';
import UsersScreen from '@/screens/users/user-screen';
import { getCountryFromCoordinates } from '@/geo';

/**
 * Renders the Users page component with initial data fetched from the server.
 *
 * The `fetchInitialData` function fetches user data from the server using the `getUsers` service.
 * It logs a message to the console, filters out any invalid user data, and returns only the first
 * 8 users for testing purposes.
 *
 * The page component is set to revalidate (fetch new data from the server) every 15 minutes (900 seconds).
 *
 * @returns A React component representing the Users page, with the initial user data passed as a prop.
 */

// Asynchronous function to fetch the initial data
async function fetchInitialData(): Promise<User[]> {
  // Call the getUsers service and log the action
  const result = await getUsers(getCountryFromCoordinates)();
  console.log('User page', 'fetchInitialData');

  // If the result is right (success), use the value, otherwise use an empty array
  const data = isRight(result) ? result.value : [];

  // Return only the first 8 users for testing purposes
  return data.slice(0, 8);
}

// Set the revalidation interval to 900 seconds (15 minutes)
export const revalidate = 900;

// Default export for the page component
export default async function Page() {
  // Fetch the initial data
  const initialData = await fetchInitialData();

  // Render the UsersScreen component with the initial data
  return <UsersScreen initialData={initialData} />;
}
