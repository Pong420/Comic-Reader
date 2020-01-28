import React, { ComponentType } from 'react';
import { Route, Switch, RouteProps, Redirect } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home, HomeSidebar } from './pages/Home';
import { ComicDetails, ComicDetailsSidebar } from './pages/ComicDetails';
import { ComicContent, ComicContentSidebar } from './pages/ComicContent';
import { Search } from './pages/Search';
import {
  BrowsingHistory,
  BrowsingHistorySidebar
} from './pages/BrowsingHistory';
import { Bookmark, BookmarkSidebar } from './pages/Bookmark';
import { Filter, FilterSidebar } from './pages/Filter';
import { PATHS } from './constants';
import { ClearTosterOnLocationChanged } from './utils/toaster';
import { ComicContentProvider } from './hooks/useComicContent';

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
    path: PATHS.COMIC_DETAILS,
    main: ComicDetails,
    sidebar: ComicDetailsSidebar
  },
  {
    path: PATHS.COMIC_CONTENT,
    main: ComicContent,
    sidebar: ComicContentSidebar
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
  <ComicContentProvider>
    <Switch>
      {routes.map(({ sidebar = Sidebar, ...props }, index) => (
        <Route {...props} key={index} component={sidebar} />
      ))}
    </Switch>
    <Switch>
      {routes.map(({ main, ...props }, index) => (
        <Route {...props} key={index} component={main} />
      ))}
      <Redirect to={PATHS.HOME} />
    </Switch>
    <ClearTosterOnLocationChanged />
  </ComicContentProvider>
);

export default App;
