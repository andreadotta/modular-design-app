import { useState, useCallback } from 'react';
import { isRight } from '@/shared/utils/either';
import { getUsers, User } from '@/users';
import { CountryFromCoordinates } from '../types/user';

/**
 * Custom hook to manage user data fetching and state.
 *
 * @param geoService - A function that returns the country based on coordinates.
 * @returns An object containing user data, loading status, error message, and a function to refresh users.
 */
export const useUsers = (geoService: CountryFromCoordinates) => {
  const [data, setData] = useState<User[]>([]); // State to hold user data
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  /**
   * Function to refresh user data.
   * It sets the loading state, fetches the user data, and updates the states based on the result.
   */
  const refreshUsers = useCallback(async () => {
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state
    const result = await getUsers(geoService)(); // Fetch user data
    if (isRight(result)) {
      setData(result.value); // Update data state if fetching is successful
    } else {
      setError(result.value.message); // Set error message if fetching fails
    }
    setLoading(false); // Set loading state to false
  }, [geoService]);

  return { data, loading, error, refreshUsers }; // Return states and refresh function
};
