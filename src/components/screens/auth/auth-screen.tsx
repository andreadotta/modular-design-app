'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoginForm, useAuth } from '@/modules/auth';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Non verrà usata per la validazione
  const { authenticate, authState } = useAuth();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await authenticate(email);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <LoginForm
          email={email}
          password={password}
          loading={authState.loading}
          error={authState.error}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={authState.loading}
        >
          {authState.loading ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default AuthScreen;
