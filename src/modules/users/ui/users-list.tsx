'use client';
import React, { useEffect, useState } from 'react';
import { User, UserEventKeys, UsersGrid } from '@/users';
import LoadingSpinner from '@/ui/loading-spinner';
import { UserEvents } from '../events';
import { useUsers } from '@/users';
import { EventBus } from '@/utils/event-bus';

type UsersListProps = {
  token: string;
  initialData: User[];
  eventBus: EventBus<UserEvents>;
  fnTest?: () => void;
};

const UsersList: React.FC<UsersListProps> = ({
  token,
  initialData,
  eventBus,
  fnTest,
}) => {
  const { data, loading, error, refreshUsers } = useUsers(token);
  const [users, setUsers] = useState<User[]>(initialData);

  useEffect(() => {
    if (data.length > 0) {
      setUsers(data);
    }
  }, [data]);

  useEffect(() => {
    const handleRefreshUsers = () => {
      refreshUsers();
    };

    eventBus.on(UserEventKeys.refreshUsers, handleRefreshUsers);

    return () => {
      eventBus.off(UserEventKeys.refreshUsers, handleRefreshUsers);
    };
  }, [eventBus, refreshUsers]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner type="circular" color="primary" />
      ) : (
        <UsersGrid data={users} fnTest={fnTest} />
      )}
    </div>
  );
};

export default UsersList;
