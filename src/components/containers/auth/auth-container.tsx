'use client';

import { LoginForm, useAuth } from '@/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContainer = () => {
  const router = useRouter();
  const { authState, authenticate } = useAuth();

  useEffect(() => {
    if (authState.authenticated) {
      console.log('User authenticated, updating store...');
      router.push('/');
    }
  }, [authState.authenticated, router]);

  const handleSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    await authenticate(credentials);
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
