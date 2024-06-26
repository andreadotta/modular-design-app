// src/components/containers/users/users-container.tsx
'use client';

import { Box, Toolbar } from '@mui/material';
import { getCountryFromCoordinates } from '@/geo';
import { User, UsersList } from '@/users';
import CustomButton from '@/ui/buttons/custom-button';
import { useUsers } from '@/modules/users/hooks/use-users';
import { useState, useEffect } from 'react';

export type UsersPageContainerProps = {
  initialData: User[];
};

const UsersContainer = ({ initialData }: UsersPageContainerProps) => {
  const { data, loading, error, refreshUsers } = useUsers(
    getCountryFromCoordinates,
  );
  const [localData, setLocalData] = useState<User[]>(initialData);

  useEffect(() => {
    if (data.length > 0) {
      setLocalData(data);
    }
  }, [data]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Users List</h1>
        <Toolbar>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={refreshUsers}
          >
            Refresh
          </CustomButton>
        </Toolbar>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <UsersList data={localData} loading={loading} />
    </div>
  );
};

export default UsersContainer;
