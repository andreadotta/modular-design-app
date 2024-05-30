import { TextField, Box, Typography, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  loading: boolean;
  error: string | null;
  onSubmit: (data: FormData) => void;
};

const LoginForm = ({ loading, error, onSubmit }: LoginFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          {...register('email')}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          sx={{ marginTop: 2 }}
          {...register('password')}
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
        <div>
          <p>
            <small>use: Sincere@april.biz</small>
          </p>
        </div>
      </form>
    </Box>
  );
};

export default LoginForm;
