import React from 'react';
import { CircularProgress, LinearProgress, Box } from '@mui/material';

type LoadingSpinnerProps = {
  type?: 'circular' | 'linear';
  color?: 'primary' | 'secondary' | 'inherit' | 'success';
  variant?: 'indeterminate' | 'determinate';
  value?: number;
  disableShrink?: boolean;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = 'circular',
  color = 'primary',
  variant = 'indeterminate',
  value = 0,
  disableShrink = false,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {type === 'circular' ? (
        <CircularProgress
          color={color}
          variant={variant}
          value={variant === 'determinate' ? value : undefined}
          disableShrink={disableShrink}
        />
      ) : (
        <LinearProgress
          color={color}
          variant={variant}
          value={variant === 'determinate' ? value : undefined}
        />
      )}
    </Box>
  );
};

export default LoadingSpinner;
