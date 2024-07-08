import React from 'react';
import Sidebar from '@/components/sidebar/ui';
import CustomBox from '@/ui/box/custom-box';
import CustomContainer from '@/ui/containers/custom-container';

const drawerWidth = 240;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomContainer maxWidth="lg" className="flex flex-row h-screen">
      <Sidebar drawerWidth={drawerWidth} />
      <CustomBox
        component="main"
        className="flex-grow p-4"
        leftMargin={drawerWidth}
      >
        {children}
      </CustomBox>
    </CustomContainer>
  );
}
