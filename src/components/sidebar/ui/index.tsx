'use client';
import React from 'react';
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

const drawerWidth = 240;

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#F4F6F8', // background color for sidebar
          borderRight: '1px solid #E0E0E0', // border
        },
      }}
    >
      <Toolbar>
        <ListItemText primary="Modular Design App" />
      </Toolbar>
      <Divider />
      <List>
        <ListItem component={Link} href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} href="/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="User List" />
        </ListItem>
        {user ? (
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem component={Link} href="/auth">
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
