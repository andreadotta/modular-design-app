import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button
      {...props}
      className="shadow-lg" // Tailwind CSS class for the box shadow
    >
      {children}
    </Button>
  );
};

export default CustomButton;
