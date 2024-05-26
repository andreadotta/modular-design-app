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
      {loading ? (
        <LoadingSpinner type="circular" color="primary" />
      ) : (
        <UsersGrid data={data} />
      )}
    </div>
  );
};

export default UserList;
