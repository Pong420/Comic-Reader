import * as React from 'react';
import { Switch, Route } from 'react-router';
const routes = require('./constants/routes.json');
import App from './containers/App';
import { HomePage } from './containers/HomePage';
import { ComicPage } from './containers/ComicPage';
import { ContentPage } from './containers/ContentPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} exact />
      <Route path={routes.COMIC} component={ComicPage} />
      <Route path={routes.CONTENT} component={ContentPage} />
    </Switch>
  </App>
);
