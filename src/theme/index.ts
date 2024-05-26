// src/theme/index.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5', // Primary blue color
    },
    secondary: {
      main: '#FF4081', // Secondary pink color
    },
    background: {
      default: '#F4F6F8', // Light gray background color
      paper: '#FFFFFF', // Background color for elements like cards
    },
    text: {
      primary: '#333333', // Primary text color
      secondary: '#777777', // Secondary text color
    },
    divider: '#E0E0E0', // Divider color
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1E88E5', // Title text color
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#333333', // Subtitle text color
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#333333', // Body text color
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for buttons
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#1E88E5', // Primary color for buttons
          '&:hover': {
            backgroundColor: '#1565C0', // Darker color on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // White background color for the top bar
          color: '#333333', // Text color for the top bar
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F4F6F8', // Light gray background color for the sidebar
          borderRight: '1px solid #E0E0E0', // Divider border
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E0E0E0', // Bottom border
          '&:last-child': {
            borderBottom: 'none', // No border for the last item
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#1E88E5', // Icon color
        },
      },
    },
  },
});

export default theme;
