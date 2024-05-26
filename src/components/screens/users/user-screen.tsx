'use client';

import React, { useState } from 'react';
import { getUsers } from '@/users/services/get-users';
import { ValidatedUser } from '@/users/types/user';
import { isRight } from '@/shared/utils/either';
import UserList from '@/components/users/ui/users-list';
import { Box, Toolbar, Button } from '@mui/material';
import { getCountryFromCoordinates } from '@/components/geo';

export type UsersPageProps = {
  initialData: ValidatedUser[];
};

const UsersScreen = ({ initialData }: UsersPageProps) => {
  const [data, setData] = useState<ValidatedUser[]>(initialData);
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
      <UserList data={data} loading={loading} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Toolbar>
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            Refresh
          </Button>
        </Toolbar>
      </Box>
    </div>
  );
};

export default UsersScreen;
