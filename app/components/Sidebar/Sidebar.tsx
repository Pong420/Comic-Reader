import React, { ReactNode } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
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
      {macos && <div className="drag-area" />}

      <div className="sidebar-content">
        <Link to="/">
          <SidebarIcon Icon={BackToHome} tooltip="首頁" />
        </Link>

        <Link to="/search">
          <SidebarIcon Icon={Search} tooltip="搜索" />
        </Link>

        <Link to="/history">
          <SidebarIcon Icon={HistoryIcon} tooltip="瀏覽紀錄" />
        </Link>

        <Link to="/bookmark">
          <SidebarIcon Icon={BookMarksIcon} tooltip="收藏" />
        </Link>

        {!!children && <SidebarDivider />}

        {children}
      </div>
    </div>
  );
};

export const Sidebar = withRouter(SidebarComponent);
