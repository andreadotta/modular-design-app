import { useState, useCallback } from 'react';
import { isRight } from '@/shared/utils/either';
import { getUsers, User } from '@/users';
import { CountryFromCoordinates } from '../types/user';

export const useUsers = (geoService: CountryFromCoordinates) => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await getUsers(geoService)();
    if (isRight(result)) {
      setData(result.value);
    } else {
      setError(result.value.message);
    }
    setLoading(false);
  }, [geoService]);

  return { data, loading, error, refreshUsers };
};
