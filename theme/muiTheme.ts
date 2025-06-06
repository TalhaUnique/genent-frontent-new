import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' for dark mode
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    action:{
      hover: 'rgba(25, 118, 210, 0.08)', // Custom hover color for action items
      selected: 'rgba(25, 118, 210, 0.16)', // Custom selected color for action items
    }
    // primary: {
    //   main: '#fcba03',
    // },
    // secondary: {
    //   main: '#1976d2',
    // },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          // Only apply radius if it's not an IconButton (icon buttons use 'icon' variant or special props)
          borderRadius:
            ownerState.variant === 'contained' || ownerState.variant === 'outlined'
              ? 50
              : undefined,
        }),
      },
    },
  },
});

export default muiTheme;