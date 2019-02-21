import React, { useEffect, useState, ReactNode } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Search from '@material-ui/icons/SearchOutlined';
import BackToHome from '@material-ui/icons/HomeRounded';
import HistoryIcon from '@material-ui/icons/HistoryRounded';
import BookMarksIcon from '@material-ui/icons/BookMarks';
import { SidebarIcon } from './SidebarIcon';
import { SidebarDivider } from './SidebarDivider';

interface SidebarProps extends RouteComponentProps {
  className: string;
  children?: ReactNode;
}

const checkFullscreen = () => window.outerHeight === screen.height;

export const Sidebar = withRouter(
  ({ className = '', children }: SidebarProps) => {
    const [isFullscreen, setIsFullscreen] = useState(checkFullscreen());

    useEffect(() => {
      function onResize() {
        setIsFullscreen(checkFullscreen());
      }

      window.addEventListener('resize', onResize);

      return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
      <div
        className={`sidebar ${className}`.trim()}
        style={{ paddingTop: `${isFullscreen ? '15' : '40'}px` }}
      >
        <div className="drag-area" />

        <Link to="/">
          <SidebarIcon Icon={BackToHome} />
        </Link>

        <Link to="/search">
          <SidebarIcon Icon={Search} />
        </Link>

        <Link to="/history">
          <SidebarIcon Icon={HistoryIcon} />
        </Link>

        <Link to="/bookmark">
          <SidebarIcon Icon={BookMarksIcon} />
        </Link>

        {!!children && <SidebarDivider />}

        {children}
      </div>
    );
  }
);
