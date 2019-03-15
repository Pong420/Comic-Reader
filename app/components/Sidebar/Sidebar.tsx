import React, { ReactNode } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Search from '@material-ui/icons/SearchOutlined';
import BackToHome from '@material-ui/icons/HomeRounded';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import BookMarksIcon from '@material-ui/icons/Bookmarks';
import { SidebarIcon } from './SidebarIcon';
import { SidebarDivider } from './SidebarDivider';
import { useFullscreen } from '../../utils/useFullscreen';
import { PATH, MAC_OS } from '../../constants';

interface SidebarProp {
  className: string;
  children?: ReactNode;
}

const SidebarComponent = ({
  className = '',
  children
}: SidebarProp & RouteComponentProps) => {
  const isFullscreen = useFullscreen(MAC_OS);
  const paddingTop = !MAC_OS || isFullscreen ? 15 : 40;

  return (
    <div className={`sidebar ${className}`.trim()} style={{ paddingTop }}>
      {MAC_OS && <div className="app-region" />}

      <div className="sidebar-content">
        <SidebarIcon to={PATH.HOME} tooltip="首頁" Icon={BackToHome} />

        <SidebarIcon to={PATH.SEARCH} tooltip="搜索" Icon={Search} />

        <SidebarIcon
          to={PATH.BROWSING_HISTORY}
          tooltip="瀏覽紀錄"
          Icon={HistoryIcon}
        />

        <SidebarIcon to={PATH.BOOKMARK} tooltip="收藏" Icon={BookMarksIcon} />

        {!!children && <SidebarDivider />}

        {children}
      </div>
    </div>
  );
};

export const Sidebar = withRouter(SidebarComponent);
