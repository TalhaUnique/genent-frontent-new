import { createTheme } from '@mui/material/styles';

const getMuiTheme = (mode: "light" | "dark" = "light") => {
  return createTheme({
    palette: {
      mode,
      // You can define palette variations based on mode here
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            borderRadius:
              ownerState.variant === 'contained' || ownerState.variant === 'outlined'
                ? 50
                : undefined,
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : undefined,
          }),
        },
      },
    },
  });
};

export default getMuiTheme;