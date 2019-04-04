import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './page/HomePage';
import { PATHS } from './constants';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={PATHS.HOME} component={HomePage} />
    </Switch>
  </Router>
);

export default App;
