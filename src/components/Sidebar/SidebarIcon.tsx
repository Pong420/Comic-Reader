import React, { ReactElement, SVGAttributes } from 'react';
import { Classes, Icon, IconName } from '@blueprintjs/core';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface Props extends Pick<Partial<NavLinkProps>, 'to'> {
  icon: IconName | ReactElement<SVGAttributes<SVGElement>>;
  isActive?: boolean;
}

const className = 'sidebar-icon';

export function SidebarIcon({ icon, to, isActive }: Props) {
  const iconContent =
    typeof icon === 'string' ? (
      <Icon icon={icon} />
    ) : (
      <span className={Classes.ICON}>{icon}</span>
    );

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
