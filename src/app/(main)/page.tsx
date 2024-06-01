import type { ReactElement } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import CustomButton from '@/design-system/buttons/custom-button';
import MainLayout from './layout';

const Home = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Welcome to Modular Design App
        </Typography>
        <Typography variant="body1" paragraph>
          This project exemplifies a modular design application that emphasizes
          a breakable, component-driven approach. Our architecture is designed
          to be easily transformed into microfrontends in the future, ensuring
          scalability and maintainability.
        </Typography>
        <Typography variant="body1" paragraph>
          The application is built with clear separation of concerns, dividing
          the logic into distinct layers: business logic, UI components, and
          data access. This structure allows for individual parts of the
          application to be developed, tested, and deployed independently,
          fostering flexibility and robustness.
        </Typography>
        <Typography variant="body1" paragraph>
          By leveraging this architecture, we aim to demonstrate how a
          well-structured application can adapt to evolving requirements and
          seamlessly integrate new features. Explore our features and see how
          we've implemented these best practices.
        </Typography>
        <Link href="/users" passHref>
          <CustomButton variant="contained" color="primary">
            View Users
          </CustomButton>
        </Link>
      </Box>
    </Container>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
