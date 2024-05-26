// src/components/ui/UserList.tsx
import React from 'react';
import { Box, Button, Toolbar } from '@mui/material';
import { ValidatedUser } from '@/users/types/user';
import UsersGrid from '@/users/ui/user-components';
import LoadingSpinner from '@/shared/components/ui/loading-spinner';

type UserListProps = {
  data: ValidatedUser[];
  loading: boolean;
};

const UserList = ({ data, loading }: UserListProps) => {
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Users List</h1>
        <Toolbar>
          <Button variant="contained" color="primary">
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
};

export default UserList;
