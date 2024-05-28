'use client';
import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import styled from 'styled-components';

const CustomStyledButton = styled(Button)`
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
`;

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return <CustomStyledButton {...props}>{children}</CustomStyledButton>;
};

export default CustomButton;
