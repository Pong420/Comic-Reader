import React, { ComponentType } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteProps
} from 'react-router-dom';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { Home, HomeSidebar } from './components/Home';
import { Comic, ComicSidebar } from './components/Comic';
import { Content, ContentSidebar } from './components/Content';
import { Filter, FilterSidebar } from './components/Filter';
import { Search } from './components/Search';
import {
  BrowsingHistory,
  BrowsingHistorySidebar
} from './components/BrowsingHistory';
import { Bookmark, BookmarkSidebar } from './components/Bookmark';
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
    path: PATHS.FILTER,
    exact: true,
    main: Filter,
    sidebar: FilterSidebar
  },
  {
    path: PATHS.SEARCH,
    exact: true,
    main: Search
  },
  {
    path: PATHS.BOOKMARK,
    exact: true,
    main: Bookmark,
    sidebar: BookmarkSidebar
  },
  {
    path: PATHS.BROWSING_HISTORY,
    exact: true,
    main: BrowsingHistory,
    sidebar: BrowsingHistorySidebar
  },
  {
    path: PATHS.COMIC,
    exact: true,
    main: Comic,
    sidebar: ComicSidebar
  },
  {
    path: PATHS.CONTENT,
    exact: true,
    main: Content,
    sidebar: ContentSidebar
  }
];

const App = () => (
  <Router>
    <TitleBar />
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
