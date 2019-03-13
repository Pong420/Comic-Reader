import React, { ComponentType } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router';
import App from './containers/App';
import PATH from './paths.json';
import { TitleBar } from './components/TitleBar';
import { HomePage } from './containers/HomePage';
import { ComicPage } from './containers/ComicPage';
import { ContentPage } from './containers/ContentPage';
import { SearchPage } from './containers/SearchPage';
import { BrowsingHistoryPage } from './containers/BrowsingHistoryPage';
import { BookmarkPage } from './containers/BookmarkPage';
import { FilterPage } from './containers/FilterPage';
import { Sidebar } from './components/Sidebar';
import { HomeSidebar } from './components/Home/HomeSidebar';
import { ComicSidebar } from './components/Comic/ComicSidebar';
import { ContentSidebar } from './components/Content/ContentSidebar';
import { BrowsingHistorySidebar } from './components/BrowsingHistory/BrowsingHistorySidebar';
import { BookmarkSidebar } from './components/Bookmark/BookmarkSidebar';

interface CustomRouteProps extends RouteProps {
  main: ComponentType<any>;
  sidebar?: ComponentType<any>;
}

const routes: CustomRouteProps[] = [
  {
    path: PATH.HOME,
    exact: true,
    main: HomePage,
    sidebar: HomeSidebar
  },
  {
    path: PATH.COMIC,
    main: ComicPage,
    sidebar: ComicSidebar
  },
  {
    path: PATH.CONTENT,
    main: ContentPage,
    sidebar: ContentSidebar
  },
  {
    path: PATH.SEARCH,
    main: SearchPage
  },
  {
    path: PATH.BROWSING_HISTORY,
    main: BrowsingHistoryPage,
    sidebar: BrowsingHistorySidebar
  },
  {
    path: PATH.BOOKMARK,
    main: BookmarkPage,
    sidebar: BookmarkSidebar
  },
  {
    path: PATH.FILTER,
    main: FilterPage
  }
];

export default () => (
  <App>
    <TitleBar />
    <main className={process.platform}>
      {routes.map(({ sidebar = Sidebar, ...props }, index) => (
        <Route {...props} key={index} component={sidebar} />
      ))}
      <Switch>
        {routes.map(({ main, ...props }, index) => (
          <Route {...props} key={index} component={main} />
        ))}
        <Redirect to={PATH.HOME} />
      </Switch>
    </main>
  </App>
);
