import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { MuiIcon, MuiIconProps } from '../../components/MuiIcon';

interface Props extends Pick<Partial<NavLinkProps>, 'to'>, MuiIconProps {
  isActive?: boolean;
}

const className = 'sidebar-icon';

export function SidebarIcon({ icon, to, isActive }: Props) {
  const iconContent = <MuiIcon icon={icon} />;

  if (to) {
    return (
      <NavLink className={className} to={to}>
        {iconContent}
      </NavLink>
    );
  }

  return (
    <div className={`${className} ${isActive ? 'active' : ''}`}>
      {iconContent}
    </div>
  );
}
