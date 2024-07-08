'use client';

import React from 'react';
import { Box, Toolbar } from '@mui/material';
import CustomButton from '@/ui/buttons/custom-button';
import { User, UsersList } from '@/users';
import { UserEvents, UserEventKeys } from '@/modules/users/events';
import { createEventBus } from '@/utils/event-bus';

export type UsersPageContainerProps = {
  initialData: User[];
  token: string;
};

const UsersContainer: React.FC<UsersPageContainerProps> = ({
  initialData,
  token,
}) => {
  const userEventBus = createEventBus<UserEvents>('users-scope');

  const emitRefreshUsers = () => {
    userEventBus.emit(UserEventKeys.refreshUsers, undefined);
  };

  return (
    <div>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <h1>Users List</h1>
          <Toolbar>
            <CustomButton
              variant="contained"
              color="primary"
              onClick={emitRefreshUsers}
            >
              Refresh
            </CustomButton>
          </Toolbar>
        </Box>
        <UsersList
          token={token}
          initialData={initialData}
          eventBus={userEventBus}
        />
      </Box>
    </div>
  );
};

export default UsersContainer;
