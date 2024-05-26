import Sidebar from '@/components/sidebar/ui';
import { Box, Container } from '@mui/material';
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
