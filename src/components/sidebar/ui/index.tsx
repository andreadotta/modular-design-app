'use client';
import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  Toolbar,
  ListItemIcon,
} from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Login,
  Logout,
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/auth';

interface SidebarProps {
  drawerWidth: number;
}

const Sidebar = ({ drawerWidth }: SidebarProps) => {
  const { authState, logout } = useAuth();
  const [authenticated, setAuthenticated] = useState(authState.authenticated);

  useEffect(() => {
    setAuthenticated(authState.authenticated);
  }, [authState.authenticated]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#F4F6F8', // background color for sidebar
          borderRight: '1px solid #E0E0E0', // border
        },
      }}
    >
      <Toolbar>
        <ListItemText
          primary="Modular Design App"
          className="font-bold text-lg"
        />
      </Toolbar>
      <Divider />
      <List>
        <ListItem
          component={Link}
          href="/"
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          href="/users"
          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="User List" />
        </ListItem>
        {authenticated ? (
          <ListItem
            component={Link}
            onClick={logout}
            href=""
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem
            component={Link}
            href="/auth"
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
          >
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
