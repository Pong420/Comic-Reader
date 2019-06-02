import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontSize: 14
  },
  props: {
    MuiSvgIcon: {
      color: 'inherit'
    },
    MuiButton: {
      color: 'inherit'
    }
  }
});

export default theme;
