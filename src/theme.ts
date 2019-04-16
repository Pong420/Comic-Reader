import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2a2a2a'
    },
    secondary: {
      main: '#fb0'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Helvetica, Arial, 微軟正黑體, Microsoft JhengHei, sans-serif'
  },
  overrides: {
    MuiSvgIcon: {
      colorPrimary: {
        color: '#fff'
      }
    },
    MuiDialog: {
      paper: {
        backgroundColor: '#2a2a2a'
      }
    },
    MuiSnackbar: {
      anchorOriginBottomCenter: {
        left: 'calc(50% + 60px) !important',
        right: 'auto !important',
        bottom: '10px !important',
        transform: 'translateX(-50%)'
      }
    }
  }
});

export default theme;
