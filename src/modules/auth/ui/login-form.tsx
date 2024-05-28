// src/components/LoginForm.tsx
import { TextField, Box, Typography, Button } from '@mui/material';

type LoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
};

const LoginForm = ({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={onEmailChange}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          fullWidth
          required
          sx={{ marginTop: 2 }}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
