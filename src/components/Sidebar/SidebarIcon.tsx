import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { MuiIcon, MuiIconProps } from '../../components/MuiIcon';

interface Props extends Pick<Partial<NavLinkProps>, 'to'>, MuiIconProps {
  isActive?: boolean;
  onClick?: () => void;
}

const className = 'sidebar-icon';

export function SidebarIcon({ icon, to, isActive, onClick }: Props) {
  const iconContent = <MuiIcon icon={icon} />;

  if (to) {
    return (
      <NavLink exact className={className} to={to} onClick={onClick}>
        {iconContent}
      </NavLink>
    );
  }

  return (
    <div
      className={`${className} ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {iconContent}
    </div>
  );
}
