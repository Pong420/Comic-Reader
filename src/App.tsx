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
import { ComicDetails, ComicDetailsSidebar } from './pages/ComicDetails';
import { ComicContent } from './pages/ComicContent';
import { PATHS } from './constants';
import { ClearTosterOnLocationChanged } from './utils/toaster';

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
    path: PATHS.COMIC_DETAILS,
    main: ComicDetails,
    sidebar: ComicDetailsSidebar
  },
  {
    path: PATHS.COMIC_CONTENT,
    main: ComicContent,
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
    <ClearTosterOnLocationChanged />
  </Router>
);

export default App;
