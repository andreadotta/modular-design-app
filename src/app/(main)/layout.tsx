import React from 'react';
import Sidebar from '@/components/sidebar/ui';
import StyledBox from '@/ui/box/styled-box';
import CustomContainer from '@/ui/containers/custom-container';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomContainer maxWidth="lg">
      <Sidebar />
      <StyledBox component="main">{children}</StyledBox>
    </CustomContainer>
  );
}
