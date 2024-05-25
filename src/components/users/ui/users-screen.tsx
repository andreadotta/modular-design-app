// src/app/users/ui/UsersPage.tsx

'use client';

import UsersGrid from '@/users/ui/user-components';
import React, { useState } from 'react';
import { Button, Toolbar, Box } from '@mui/material';
import { getUsers } from '@/users/services/get-users';
import { ValidatedUser } from '@/users/types/user';
import { isRight } from '@/shared/utils/either';
import LoadingSpinner from '@/shared/components/loading-spinner';

export type UsersPageProps = {
  initialData: ValidatedUser[];
};

export default function UsersScreen({ initialData }: UsersPageProps) {
  const [data, setData] = useState<ValidatedUser[]>(initialData);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    const result = await getUsers()();
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
      {loading ? (
        <LoadingSpinner type="circular" color="primary" />
      ) : (
        <UsersGrid data={data} />
      )}
    </div>
  );
}
