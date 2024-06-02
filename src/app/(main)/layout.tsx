import React from 'react';
import Sidebar from '@/components/sidebar/ui';
import StyledBox from '@/design-system/box/styled-box';
import CustomContainer from '@/design-system/containers/custom-container';

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
