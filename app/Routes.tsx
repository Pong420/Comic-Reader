import React, { ComponentType } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router';
import App from './containers/App';
import { TitleBar } from './components/TitleBar';
import { HomePage } from './containers/HomePage';
import { ComicPage } from './containers/ComicPage';
import { ContentPage } from './containers/ContentPage';
import { SearchPage } from './containers/SearchPage';
import { BrowsingHistoryPage } from './containers/BrowsingHistoryPage';
import { BookmarkPage } from './containers/BookmarkPage';
import { Sidebar } from './components/Sidebar';
import { ComicSidebar } from './components/Comic/ComicSidebar';
import { ContentSidebar } from './components/Content/ContentSidebar';
import { BrowsingHistorySidebar } from './components/BrowsingHistory/BrowsingHistorySidebar';
import { BookmarkSidebar } from './components/Bookmark/BookmarkSidebar';

interface CustomRouteProps extends RouteProps {
  main: ComponentType<any>;
  sidebar: ComponentType<any>;
}

const routes: CustomRouteProps[] = [
  {
    path: '/',
    exact: true,
    main: HomePage,
    sidebar: Sidebar
  },
  {
    path: '/comic/:comicID',
    main: ComicPage,
    sidebar: ComicSidebar
  },
  {
    path: '/content/:comicID/:chapterID/:pageNo',
    main: ContentPage,
    sidebar: ContentSidebar
  },
  {
    path: '/search',
    main: SearchPage,
    sidebar: Sidebar
  },
  {
    path: '/history',
    main: BrowsingHistoryPage,
    sidebar: BrowsingHistorySidebar
  },
  {
    path: '/bookmark',
    main: BookmarkPage,
    sidebar: BookmarkSidebar
  }
];

export default () => (
  <App>
    <TitleBar />
    <main>
      {routes.map(({ sidebar, ...props }, index) => (
        <Route {...props} key={index} component={sidebar} />
      ))}
      <Switch>
        {routes.map(({ main, ...props }, index) => (
          <Route {...props} key={index} component={main} />
        ))}
        <Redirect to="/" />
      </Switch>
    </main>
  </App>
);
