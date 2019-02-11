import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import grey from '@material-ui/core/colors/grey';
import Divider from '@material-ui/core/Divider';

export interface SidebarDividerProps extends WithStyles<typeof styles> {}

const styles = () =>
  createStyles({
    divider: {
      background: grey.A200,
      marginTop: 10,
      marginBottom: 10,
      width: 40
    }
  });

export const SidebarDivider = withStyles(styles)(
  ({ classes }: SidebarDividerProps) => <Divider className={classes.divider} />
);
