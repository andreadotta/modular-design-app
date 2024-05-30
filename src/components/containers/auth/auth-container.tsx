'use client';

import { LoginForm, useAuth } from '@/auth';
import { useAuthStore } from '@/stores/auth-store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContainer = () => {
  const { authState, authenticate } = useAuth();
  const { setUser, setAccessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authState.user) {
      console.log('User authenticated, updating store...');
      setUser(authState.user);
      const accessToken = 'dummy-access-token';
      setAccessToken(accessToken);
      // Call the onLoginSuccess callback
      router.push('/');
    }
  }, [authState.user, setUser, setAccessToken, router]);

  const handleSubmit = async (data: { email: string; password: string }) => {
    await authenticate(data.email);
    console.log(data.email);
  };

  return (
    <LoginForm
      loading={authState.loading}
      error={authState.error}
      onSubmit={handleSubmit}
    />
  );
};

export default AuthContainer;
