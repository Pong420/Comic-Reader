import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import App from './containers/App';
import { HomePage } from './containers/HomePage';
import { ComicPage } from './containers/ComicPage';
import { ContentPage } from './containers/ContentPage';
import { SearchPage } from './containers/SearchPage';
import { HistoryPage } from './containers/HistoryPage';
import { BookmarkPage } from './containers/BookmarkPage';

const routes = require('./constants/routes.json');

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} exact />
      <Route path={routes.COMIC} component={ComicPage} />
      <Route path={routes.CONTENT} component={ContentPage} />
      <Route path={routes.SEARCH} component={SearchPage} />
      <Route path={routes.HISTORY} component={HistoryPage} />
      <Route path={routes.BOOKMARK} component={BookmarkPage} />
      <Redirect to="/" />
    </Switch>
  </App>
);
