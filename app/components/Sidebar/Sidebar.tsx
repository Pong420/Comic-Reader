import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Search from '@material-ui/icons/SearchOutlined';
import BackToHome from '@material-ui/icons/HomeRounded';
import { SidebarIcon } from './SidebarIcon';
import { SidebarDivider } from './SidebarDivider';
import { SidebarIcons } from '../../../typing';

interface SidebarProps extends RouteComponentProps {
  Icons?: SidebarIcons;
}

export const Sidebar = withRouter(({ Icons = [] }: SidebarProps) => (
  <div className="sidebar">
    <SidebarIcon Icon={Search} />
    <Link to={{ pathname: '/' }}>
      <SidebarIcon Icon={BackToHome} />
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
));
