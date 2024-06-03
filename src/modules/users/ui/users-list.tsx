'use client';
import React from 'react';
import { User, UsersGrid } from '@/modules/users';
import LoadingSpinner from '@/ui/loading-spinner';

type UserListProps = {
  data: User[];
  loading: boolean;
  fnTest?: () => void;
};

const UsersList = ({ data, loading, fnTest }: UserListProps) => {
  return (
    <div>
      {loading ? (
        <LoadingSpinner type="circular" color="primary" />
      ) : (
        <UsersGrid data={data} fnTest={fnTest} />
      )}
    </div>
  );
};

export default UsersList;
