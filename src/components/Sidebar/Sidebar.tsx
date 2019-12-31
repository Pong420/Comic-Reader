import React, { ReactNode } from 'react';
import { SidebarIcon } from './SidebarIcon';
import { AppRegion } from './AppRegion';
import { PATHS } from '../../constants';
import { ReactComponent as HomeIcon } from '../../assets/home-24px.svg';
import { ReactComponent as SearchIcon } from '../../assets/search-24px.svg';
import { ReactComponent as HistoryIcon } from '../../assets/history-24px.svg';
import { ReactComponent as bookmarksIcon } from '../../assets/bookmarks-24px.svg';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Sidebar({ className = '', children }: Props) {
  return (
    <div className={`sidebar ${className}`.trim()}>
      <AppRegion />
      <div className="sidebar-content">
        <SidebarIcon tooltip="首頁" icon={HomeIcon} to={PATHS.HOME} />
        <SidebarIcon tooltip="搜索" icon={SearchIcon} to={PATHS.SEARCH} />
        <SidebarIcon
          tooltip="瀏覽紀錄"
          icon={HistoryIcon}
          to={PATHS.BROWSING_HISTORY}
        />
        <SidebarIcon tooltip="收藏" icon={bookmarksIcon} to={PATHS.BOOKMARK} />

        {!!children && <div className="divider" />}

        {children}
      </div>
    </div>
  );
}
