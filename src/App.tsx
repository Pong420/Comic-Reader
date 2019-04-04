import React, { ComponentType } from 'react';
import { HashRouter as Router, Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './page/HomePage';
import { PATHS } from './constants';

interface CustomRouteProps extends RouteProps {
  main: ComponentType<any>;
  sidebar?: ComponentType<any>;
}

const routes: CustomRouteProps[] = [
  {
    path: PATHS.HOME,
    exact: true,
    main: HomePage,
    sidebar: Sidebar
  }
];

const App = () => (
  <Router>
    <main className={process.platform}>
      {routes.map(({ sidebar = Sidebar, ...props }, index) => (
        <Route {...props} key={index} component={sidebar} />
      ))}
      <Switch>
        {routes.map(({ main, ...props }, index) => (
          <Route {...props} key={index} component={main} />
        ))}
        <Redirect to={PATHS.HOME} />
      </Switch>
    </main>
  </Router>
);

export default App;
