import * as React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';
import './app.global.scss';

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept();
}
