import React, { ComponentType, ReactElement } from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface SidebarIconProps {
  tooltip?: string;
  Icon?: ComponentType<SvgIconProps>;
  Component?: ComponentType<any>;
  [props: string]: any;
}

interface AddTooltipProps {
  tooltip?: string;
  children: ReactElement<any>;
}

const sidebarIconStyles = () => {
  const root = {
    width: 50,
    minWidth: 50,
    height: 50,
    padding: 0,
    color: grey.A200,
    '&:hover': {
      color: grey[50],
      '& $icon': {
        color: grey[50]
      }
    }
  };

  return createStyles({
    root,
    iconButton: {
      ...root
    },
    icon: {
      fontSize: 30
    }
  });
};

function WithTooltip({ tooltip, children }: AddTooltipProps) {
  if (tooltip) {
    return (
      <Tooltip
        title={tooltip}
        placement="right"
        disableTouchListener
        disableFocusListener
      >
        {children}
      </Tooltip>
    );
  }

  return children;
}

function SidebarIconComponent({
  tooltip,
  Icon,
  Component,
  classes,
  ...props
}: SidebarIconProps & WithStyles<typeof sidebarIconStyles>) {
  const { root, iconButton, icon } = classes;

  if (Icon) {
    return (
      <IconButton className={iconButton} {...props}>
        <WithTooltip tooltip={tooltip}>
          <Icon className={icon} color="inherit" />
        </WithTooltip>
      </IconButton>
    );
  }

  if (Component) {
    return <Component className={root} {...props} />;
  }

  return null;
}

export const SidebarIcon = withStyles(sidebarIconStyles)(SidebarIconComponent);
