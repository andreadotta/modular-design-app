'use client';
import { useState } from 'react';
import { isRight } from '@/shared/utils/either';
import { Box, Toolbar } from '@mui/material';
import { getCountryFromCoordinates } from '@/geo';
import { getUsers, User, UsersList } from '@/users';
import CustomButton from '@/design-system/buttons/custom-button';

export type UsersPageContainerProps = {
  initialData: User[];
};

const UsersContainer = ({ initialData }: UsersPageContainerProps) => {
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
          <CustomButton
            variant="contained"
            color="primary"
            onClick={handleRefresh}
          >
            Refresh
          </CustomButton>
        </Toolbar>
      </Box>
      <UsersList
        data={data}
        loading={loading}
        fnTest={() => {
          console.log('ciao');
        }}
      />
    </div>
  );
};

export default UsersContainer;
