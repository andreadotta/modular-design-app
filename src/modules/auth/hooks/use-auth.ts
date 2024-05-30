import { useState, useCallback } from 'react';
import { authenticateUser } from '../services/auth-service';
import { AuthUser } from '../types/auth';
import { isRight } from '@/shared/utils/either';
import { useAuthStore } from '@/stores/auth-store';

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

  const { user, setUser, clearAuth } = useAuthStore();

  const authenticate = useCallback(
    async (email: string) => {
      setAuthState({ loading: true, error: null, user: null });

      const result = await authenticateUser(email)();

      if (isRight(result)) {
        const authenticatedUser = result.value.user || null;
        setAuthState({
          loading: false,
          error: null,
          user: authenticatedUser,
        });
        setUser(authenticatedUser);
      } else {
        setAuthState({
          loading: false,
          error: result.value.message,
          user: null,
        });
      }
    },
    [setUser],
  );

  const logout = useCallback(() => {
    clearAuth();
    setAuthState({
      loading: false,
      error: null,
      user: null,
    });
  }, [clearAuth]);

  return { authState, authenticate, user, logout };
};
