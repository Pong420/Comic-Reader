import React, { ComponentType } from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface SidebarIconProps {
  Icon?: ComponentType<SvgIconProps>;
  Component?: ComponentType<any>;
  [props: string]: any;
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

function SidebarIconComponent({
  Icon,
  Component,
  classes,
  ...props
}: SidebarIconProps & WithStyles<typeof sidebarIconStyles>) {
  const { root, iconButton, icon } = classes;

  if (Icon) {
    return (
      <IconButton className={iconButton} {...props}>
        <Icon className={icon} color="inherit" />
      </IconButton>
    );
  }

  if (Component) {
    return <Component className={root} {...props} />;
  }

  return null;
}

export const SidebarIcon = withStyles(sidebarIconStyles)(SidebarIconComponent);
