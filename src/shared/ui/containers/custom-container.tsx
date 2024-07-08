import { Container, ContainerProps } from '@mui/material';
import React from 'react';

type CustomContainerProps = ContainerProps & {
  children: React.ReactNode;
};

const CustomContainer = ({ children, ...props }: CustomContainerProps) => {
  return (
    <Container className="flex bg-white max-w-screen-lg" {...props}>
      {children}
    </Container>
  );
};

export default CustomContainer;
