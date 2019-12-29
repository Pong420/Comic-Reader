import React, { ReactNode } from 'react';
import { SidebarIcon } from './SidebarIcon';
import { AppRegion } from './AppRegion';
import { PATHS } from '../../constants';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Sidebar({ className, children }: Props) {
  return (
    <div className={`sidebar ${className}`.trim()}>
      <AppRegion />
      <div className="sidebar-content">
        <SidebarIcon icon="home" to={PATHS.HOME} />
        <SidebarIcon icon="search" to={PATHS.SEARCH} />
        <SidebarIcon icon="history" to={PATHS.BROWSING_HISTORY} />
        <SidebarIcon icon="star" to={PATHS.BOOKMARK} />
        {children}
      </div>
    </div>
  );
}
