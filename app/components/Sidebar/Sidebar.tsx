import React, { ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Search from '@material-ui/icons/SearchOutlined';
import BackToHome from '@material-ui/icons/HomeRounded';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import BookMarksIcon from '@material-ui/icons/BookMarks';
import { SidebarIcon } from './SidebarIcon';
import { SidebarDivider } from './SidebarDivider';
import { useFullscreen } from '../../utils/useFullscreen';

interface SidebarProp {
  className: string;
  children?: ReactNode;
}

const macos = process.platform === 'darwin';

const SidebarComponent = ({
  className = '',
  children
}: SidebarProp & RouteComponentProps) => {
  const isFullscreen = useFullscreen(macos);
  const paddingTop = isFullscreen ? 15 : 40;

  return (
    <div className={`sidebar ${className}`.trim()} style={{ paddingTop }}>
      {macos && <div className="app-region" />}

      <div className="sidebar-content">
        <SidebarIcon to="/" tooltip="首頁" Icon={BackToHome} />

        <SidebarIcon to="/search" tooltip="搜索" Icon={Search} />

        <SidebarIcon to="/history" tooltip="瀏覽紀錄" Icon={HistoryIcon} />

        <SidebarIcon to="/bookmark" tooltip="收藏" Icon={BookMarksIcon} />

        {!!children && <SidebarDivider />}

        {children}
      </div>
    </div>
  );
};

export const Sidebar = withRouter(SidebarComponent);
