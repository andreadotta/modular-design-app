'use client';

import Sidebar from '@/components/sidebar/ui';
import StyledBox from '@/design-system/box/styled-box';
import theme from '@/theme';
import { Box, Container, ThemeProvider } from '@mui/material';
import { Head, Html } from 'next/document';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" sx={{ display: 'flex' }}>
            <Sidebar />
            <StyledBox component="main">{children}</StyledBox>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
