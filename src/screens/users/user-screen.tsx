'use client';

import { useState } from 'react';
import { isRight } from '@/shared/utils/either';
import { Box, Toolbar, Button } from '@mui/material';
import { getCountryFromCoordinates } from '@/geo';
import { getUsers, User, UsersList } from '@/users';

export type UsersPageProps = {
  initialData: User[];
};

const UsersScreen = ({ initialData }: UsersPageProps) => {
  const [data, setData] = useState<User[]>(initialData);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    const result = await getUsers(getCountryFromCoordinates)();
    if (isRight(result)) {
      setData(result.value);
    }
    setLoading(false);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Users List</h1>
        <Toolbar>
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Toolbar>
      </Box>
      <UsersList data={data} loading={loading} />
    </div>
  );
};

export default UsersScreen;
