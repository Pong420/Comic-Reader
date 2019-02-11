import React, { ComponentType } from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';

export interface SidebarIconProps extends WithStyles<typeof styles> {
  Icon: ComponentType<any>;
  [props: string]: any;
}

const styles = () =>
  createStyles({
    iconButton: {
      '&:hover': {
        background: grey.A400,
        '& $icon': {
          color: grey[50]
        }
      }
    },
    icon: {
      color: grey.A200,
      cursor: 'pointer',
      fontSize: 30
    },
    divider: {
      background: grey.A200,
      marginTop: 10,
      marginBottom: 10,
      width: 40
    }
  });

export const SidebarIcon = withStyles(styles)(
  ({ Icon, classes, ...props }: SidebarIconProps) => (
    <IconButton className={classes.iconButton} {...props}>
      <Icon className={classes.icon} color="inherit" />
    </IconButton>
  )
);
