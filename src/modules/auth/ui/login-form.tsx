import { TextField, Box, Typography } from '@mui/material';

type LoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginForm = ({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
}: LoginFormProps) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
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
    </Box>
  );
};

export default LoginForm;
