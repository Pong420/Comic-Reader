import React, { ReactNode } from 'react';
import Search from '@material-ui/icons/SearchOutlined';
import BackToHome from '@material-ui/icons/HomeRounded';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import BookMarksIcon from '@material-ui/icons/Bookmarks';
import { SidebarIcon } from './SidebarIcon';
import { SidebarDivider } from './SidebarDivider';
import { PATHS, MAC_OS } from '../../constants';
import { useFullscreen } from '../../utils/useFullscreen';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Sidebar({ className = '', children }: Props) {
  const isFullscreen = useFullscreen(MAC_OS);
  const paddingTop = !MAC_OS || isFullscreen ? 15 : 40;

  return (
    <div className={`sidebar ${className}`.trim()} style={{ paddingTop }}>
      <div className="sidebar-content">
        <SidebarIcon to={PATHS.HOME} tooltip="首頁" Icon={BackToHome} />

        <SidebarIcon to={PATHS.SEARCH} tooltip="搜索" Icon={Search} />

        <SidebarIcon to={PATHS.BROWSING_HISTORY} tooltip="瀏覽紀錄" Icon={HistoryIcon} />

        <SidebarIcon to={PATHS.BOOKMARK} tooltip="收藏" Icon={BookMarksIcon} />

        {!!children && <SidebarDivider />}

        {children}
      </div>
    </div>
  );
}
