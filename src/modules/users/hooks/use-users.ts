'use client'; // Aggiungi questa riga
import { useState, useCallback } from 'react';
import { isRight } from '@/shared/utils/either';
import { getUsers, User } from '@/users';

/**
 * Custom hook to manage user data fetching and state.
 *
 * @returns An object containing user data, loading status, error message, and a function to refresh users.
 */
export const useUsers = (token: string) => {
  const [data, setData] = useState<User[]>([]); // State to hold user data
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  /**
   * Function to refresh user data.
   * It sets the loading state, fetches the user data, and updates the states based on the result.
   */
  const refreshUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await getUsers()();
    if (isRight(result)) {
      setData(result.value);
    } else {
      setError(result.value.message);
    }
    setLoading(false);
  }, [getUsers]);

  return { data, loading, error, refreshUsers }; // Return states and refresh function
};
