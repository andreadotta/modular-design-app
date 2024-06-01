import { useState, useCallback, useEffect } from 'react';
import { authenticateUser } from '../services/auth-service';
import { useAuthStore } from '../stores/auth-store';
import { AuthResponse } from '../types/auth';
import { Either, isRight } from '@/shared/utils/either';

type AuthState = {
  loading: boolean;
  error: string | null;
  authenticated: boolean;
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
    authenticated: false,
  });

  const { user, accessToken, setUser, setAccessToken, clearAuth } =
    useAuthStore();

  useEffect(() => {
    if (user && accessToken) {
      setAuthState({
        loading: false,
        error: null,
        authenticated: true,
      });
    } else {
      setAuthState({
        loading: false,
        error: null,
        authenticated: false,
      });
    }
  }, [user, accessToken]);

  const authenticate = useCallback(
    async (credentials: { email: string; password: string }) => {
      setAuthState({ loading: true, error: null, authenticated: false });

      const result: Either<Error, AuthResponse> = await authenticateUser(
        credentials.email,
      )();

      if (isRight(result)) {
        const { user } = result.value;
        const token = 'dummy-token'; // fake token!!!!

        if (user && token) {
          setUser(user);
          setAccessToken(token);

          setAuthState({
            loading: false,
            error: null,
            authenticated: true,
          });
        } else {
          setAuthState({
            loading: false,
            error: 'Invalid user or token',
            authenticated: false,
          });
        }
      } else {
        setAuthState({
          loading: false,
          error: result.value.message,
          authenticated: false,
        });
      }
    },
    [setUser, setAccessToken],
  );

  const logout = useCallback(() => {
    clearAuth();
    setAuthState({
      loading: false,
      error: null,
      authenticated: false,
    });
  }, [clearAuth]);

  return { authState, authenticate, logout };
};
