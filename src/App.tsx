import React, { ComponentType } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteProps
} from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { Comic } from './components/Comic';
import { Content } from './components/Content';
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
  },
  {
    path: PATHS.COMIC,
    main: Comic,
    sidebar: Sidebar
  },
  {
    path: PATHS.CONTENT,
    main: Content,
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
