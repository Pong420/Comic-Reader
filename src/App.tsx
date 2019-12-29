import React, { ComponentType } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  RouteProps,
  Redirect
} from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { PATHS } from './constants';

interface CustomRouteProps extends RouteProps {
  main: ComponentType<any>;
  sidebar?: ComponentType<any>;
}

const routes: CustomRouteProps[] = [
  {
    path: PATHS.HOME,
    exact: true,
    main: Home,
    sidebar: Sidebar
  }
];

const App = () => (
  <Router>
    {routes.map(({ sidebar = Sidebar, ...props }, index) => (
      <Route {...props} key={index} component={sidebar} />
    ))}
    <Switch>
      {routes.map(({ main, ...props }, index) => (
        <Route {...props} key={index} component={main} />
      ))}
      <Redirect to={PATHS.HOME} />
    </Switch>
  </Router>
);

export default App;
