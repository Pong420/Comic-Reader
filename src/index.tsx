import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FocusStyleManager } from '@blueprintjs/core';
import App from './App';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const store = configureStore();

FocusStyleManager.onlyShowFocusOnTabs();

function render() {
  return ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
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
