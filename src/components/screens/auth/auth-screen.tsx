'use client';

import { useAuth, LoginForm } from '@/auth';
import { useState } from 'react';

const AuthScreen = () => {
  const { authState, authenticate } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await authenticate(email);
  };

  return (
    <LoginForm
      email={email}
      password={password}
      loading={authState.loading}
      error={authState.error}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
    />
  );
};

export default AuthScreen;
