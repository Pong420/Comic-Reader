import React, { ReactElement, SVGAttributes } from 'react';
import { Classes, Icon, IconName } from '@blueprintjs/core';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface Props extends Omit<Partial<NavLinkProps>, 'isActive'> {
  icon: IconName | ReactElement<SVGAttributes<SVGElement>>;
  isActive?: boolean;
}

export function SidebarIcon({ icon, to, isActive, ...props }: Props) {
  const iconContent =
    typeof icon === 'string' ? (
      <Icon icon={icon} />
    ) : (
      <span className={Classes.ICON}>{icon}</span>
    );

  const content = to ? (
    <NavLink to={to} {...props}>
      {iconContent}
    </NavLink>
  ) : (
    iconContent
  );

  return (
    <div className={`sidebar-icon ${isActive ? 'active' : ''}`}>{content}</div>
  );
}
