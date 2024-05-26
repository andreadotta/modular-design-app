// src/components/ui/UserList.tsx
import React from 'react';
import { User, UsersGrid } from '@/users';
import LoadingSpinner from '@/shared/components/ui/loading-spinner';

type UserListProps = {
  data: User[];
  loading: boolean;
};

const UsersList = ({ data, loading }: UserListProps) => {
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

export default UsersList;
