import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './index.scss';

const store = configureStore();

function render() {
  return ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept('./App', render);
}
