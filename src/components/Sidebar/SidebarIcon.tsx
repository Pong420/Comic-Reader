import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { MuiIcon, MuiIconProps } from '../../components/MuiIcon';
import { Tooltip } from '@blueprintjs/core';

interface Props extends MuiIconProps {
  to?: NavLinkProps<unknown>['to'];
  onClick?: () => void;
  isActive?: boolean;
  tooltip?: string;
}

const className = 'sidebar-icon';

export function SidebarIcon({ icon, to, tooltip, isActive, ...props }: Props) {
  const content = (
    <Tooltip
      content={tooltip}
      hoverOpenDelay={0}
      hoverCloseDelay={0}
      position="right"
      popoverClassName="sidebar-icon-tooltip"
      interactionKind="hover-target"
    >
      <MuiIcon icon={icon} />
    </Tooltip>
  );

  return to
    ? React.createElement(NavLink, { exact: true, className, to }, content)
    : React.createElement(
        'div',
        {
          ...props,
          className: `${className} ${isActive ? 'active' : ''}`
        },
        content
      );
}
