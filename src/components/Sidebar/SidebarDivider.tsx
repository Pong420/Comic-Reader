import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';

const styles = () =>
  createStyles({
    divider: {
      background: '#aaa',
      marginTop: 10,
      marginBottom: 10,
      width: 40
    }
  });

export const SidebarDivider = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <Divider className={classes.divider} />
));
