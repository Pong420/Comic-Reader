import React, { ReactNode } from 'react';
import { AppRegion } from './AppRegion';
import { IconButton } from '../Mui/IconButton';
import { classes } from '../../utils/classes';
import { PATHS } from '../../constants';
import HomeIcon from '@material-ui/icons/HomeRounded';
import BookMarksIcon from '@material-ui/icons/Bookmarks';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import Divider from '@material-ui/core/Divider';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function Sidebar({ className, children }: Props) {
  return (
    <div className={classes('sidebar', className)}>
      <AppRegion />
      <div className="sidebar-content">
        <IconButton icon={HomeIcon} to={PATHS.HOME} title="首頁" />
        <IconButton icon={SearchIcon} to={PATHS.SEARCH} title="搜索" />
        <IconButton
          icon={HistoryIcon}
          to={PATHS.BROWSING_HISTORY}
          title="瀏覽紀錄"
        />
        <IconButton icon={BookMarksIcon} to={PATHS.BOOKMARK} title="收藏" />

        {!!children && <Divider className="divider" />}

        {children}
      </div>
    </div>
  );
}
