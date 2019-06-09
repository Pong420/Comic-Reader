import React, { ComponentType } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteProps
} from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home, HomeSidebar } from './components/Home';
import { Comic, ComicSidebar } from './components/Comic';
import { Content } from './components/Content';
import { Search } from './components/Search';
import {
  BrowsingHistory,
  BrowsingHistorySidebar
} from './components/BrowsingHistory';
import { Bookmark, BookmarkSidebar } from './components/Bookmark';
import { Filter, FilterSidebar } from './components/Filter';
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
    sidebar: HomeSidebar
  },
  {
    path: PATHS.COMIC,
    main: Comic,
    sidebar: ComicSidebar
  },
  {
    path: PATHS.CONTENT,
    main: Content,
    sidebar: Sidebar
  },
  {
    path: PATHS.SEARCH,
    main: Search,
    sidebar: Sidebar
  },
  {
    path: PATHS.BROWSING_HISTORY,
    main: BrowsingHistory,
    sidebar: BrowsingHistorySidebar
  },
  {
    path: PATHS.BOOKMARK,
    main: Bookmark,
    sidebar: BookmarkSidebar
  },
  {
    path: PATHS.FILTER,
    main: Filter,
    sidebar: FilterSidebar
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
