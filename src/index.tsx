import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

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

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept();
}
