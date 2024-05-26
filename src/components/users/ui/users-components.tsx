import { DataGrid } from '@mui/x-data-grid';
import { User } from '../types/user';

type UsersGridProps = {
  data: User[];
};

export default function UsersGrid({ data }: UsersGridProps) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
  ];

  if (!data) {
    return <div>No data available</div>;
  }

  const rows = data.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    city: user.address.city,
    country: user.address.country,
  }));

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10]}
        autoHeight
      />
    </div>
  );
}
