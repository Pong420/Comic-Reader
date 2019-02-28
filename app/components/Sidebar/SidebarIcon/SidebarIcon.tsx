import React, { ComponentType, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import * as H from 'history';

export interface SidebarIconProps {
  tooltip?: string;
  to?: H.LocationDescriptor;
  Icon?: ComponentType<SvgIconProps>;
  Component?: ComponentType<any>;
  [props: string]: any;
}

interface WithTooltipProps {
  tooltip?: string;
  children: ReactElement<any>;
}

interface WithNavLinkProps {
  to?: H.LocationDescriptor;
  children: ReactElement<any>;
  activeClassName?: string;
}

const sidebarIconStyles = () => {
  const active = {
    color: grey[50]
  };

  const root = {
    width: 50,
    minWidth: 50,
    height: 50,
    padding: 0,
    color: grey.A200,
    '&:hover': {
      ...active,
      '& $icon': active
    }
  };

  return createStyles({
    root,
    linkActive: {
      '& $icon': active
    },
    iconButton: {
      ...root
    },
    icon: {
      fontSize: 30
    }
  });
};

function WithTooltip({ tooltip, children }: WithTooltipProps) {
  if (tooltip) {
    return (
      <Tooltip
        title={tooltip}
        placement="right"
        PopperProps={{
          popperOptions: {
            modifiers: {
              offset: {
                fn: (data: any) => {
                  data.offsets.popper.left = 50;
                  return data;
                }
              }
            }
          }
        }}
      >
        {children}
      </Tooltip>
    );
  }

  return children;
}

function WithNavLink({ to, activeClassName, children }: WithNavLinkProps) {
  if (to) {
    return (
      <NavLink to={to} activeClassName={activeClassName} exact>
        {children}
      </NavLink>
    );
  }

  return children;
}

function SidebarIconComponent({
  to,
  tooltip,
  Icon,
  Component,
  classes,
  ...props
}: SidebarIconProps & WithStyles<typeof sidebarIconStyles>) {
  const { root, iconButton, icon, linkActive } = classes;

  if (Icon) {
    return (
      <WithNavLink to={to} activeClassName={linkActive}>
        <WithTooltip tooltip={tooltip}>
          <IconButton className={iconButton} {...props}>
            <Icon className={icon} color="inherit" />
          </IconButton>
        </WithTooltip>
      </WithNavLink>
    );
  }

  if (Component) {
    return <Component className={root} {...props} />;
  }

  return null;
}

export const SidebarIcon = withStyles(sidebarIconStyles)(SidebarIconComponent);
