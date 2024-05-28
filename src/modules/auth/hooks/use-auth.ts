import { useState, useCallback } from 'react';
import { authenticateUser } from '../services/auth-service';
import { AuthResponse, AuthUser } from '../types/auth';
import { isRight } from '@/shared/utils/either';

type AuthState = {
  loading: boolean;
  error: string | null;
  user: AuthUser | null;
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
    user: null,
  });

  const authenticate = useCallback(async (email: string) => {
    setAuthState({ loading: true, error: null, user: null });

    const result = await authenticateUser(email)();

    if (isRight(result)) {
      setAuthState({
        loading: false,
        error: null,
        user: result.value.user || null,
      });
    } else {
      setAuthState({ loading: false, error: result.value.message, user: null });
    }
  }, []);

  return { authState, authenticate };
};
