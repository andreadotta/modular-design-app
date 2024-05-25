// src/app/layout.tsx

import Sidebar from '@/components/sidebar/ui';
import { Box, Container, Toolbar } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet={'utf-8'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </head>
      <body className={inter.className}>
        <Container maxWidth="lg" sx={{ display: 'flex' }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              p: 3,
            }}
          >
            {children}
          </Box>
        </Container>
      </body>
    </html>
  );
}
