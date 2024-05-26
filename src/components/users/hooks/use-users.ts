'use client';
import { useState, useEffect, useCallback } from 'react';
import { Either, isLeft, isRight } from '../../../shared/utils/either';
import { getUsers } from '../services/get-users';
import { GeoServiceFunction, ValidatedUser } from '../types/user';

type UserState = {
  loading: boolean;
  error: string | null;
  data: ValidatedUser[] | null;
};

export const useUsers = (
  geoService: GeoServiceFunction,
): UserState & { fetchData: () => void } => {
  const [state, setState] = useState<UserState>({
    loading: true,
    error: null,
    data: null,
  });

  const fetchData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const result = await getUsers(geoService)();

    if (isLeft(result)) {
      setState({ loading: false, error: result.value.message, data: null });
    } else if (isRight(result)) {
      setState({ loading: false, error: null, data: result.value });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, fetchData };
};
