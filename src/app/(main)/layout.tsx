import React from 'react';
import Sidebar from '@/components/sidebar/ui';
import StyledBox from '@/design-system/box/styled-box';
import { Container } from '@mui/material';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg" sx={{ display: 'flex' }}>
      <Sidebar />
      <StyledBox component="main">{children}</StyledBox>
    </Container>
  );
}
