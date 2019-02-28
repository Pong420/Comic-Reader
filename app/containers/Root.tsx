import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Routes from '../Routes';

const theme = createMuiTheme({
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
    fontFamily: "Helvetica, Arial, 微軟正黑體, Microsoft JhengHei, sans-serif"
  },
  overrides: {
    MuiSvgIcon: {
      colorPrimary: {
        color: '#fff'
      }
    }
  }
});

type Props = {
  store: any;
  history: History<any>;
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
