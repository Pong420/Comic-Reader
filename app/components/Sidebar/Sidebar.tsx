import React, { useEffect, useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Search from '@material-ui/icons/SearchOutlined';
import BackToHome from '@material-ui/icons/HomeRounded';
import { SidebarIcon } from './SidebarIcon';
import { SidebarDivider } from './SidebarDivider';
import { SidebarIcons } from '../../../typing';

interface SidebarProps extends RouteComponentProps {
  Icons?: SidebarIcons;
}

const checkFullscreen = () => window.outerHeight === screen.height;

export const Sidebar = withRouter(({ Icons = [] }: SidebarProps) => {
  const [isFullscreen, setIsFullscreen] = useState(checkFullscreen());

  useEffect(() => {
    const onResize = () => {
      setIsFullscreen(checkFullscreen());
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      className="sidebar"
      style={{ paddingTop: `${isFullscreen ? '15' : '40'}px` }}
    >
      <div className="drag-area"></div>
      
      <Link to={{ pathname: '/' }}>
        <SidebarIcon Icon={BackToHome} />
      </Link>
      <Link to="/search">
        <SidebarIcon Icon={Search} />
      </Link>

      {!!Icons.length && <SidebarDivider />}
      
      {Icons.map((Icon, index) => {
        if (typeof Icon === 'object') {
          const { component, ...props } = Icon;
          return <SidebarIcon Icon={component} key={index} {...props} />;
        }

        return <SidebarIcon Icon={Icon} key={index} />;
      })}
    </div>
  );
});
