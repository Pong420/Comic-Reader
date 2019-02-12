import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Layout } from '../Layout';

export interface LoadingProps extends WithStyles<typeof styles> {}

const styles = () =>
  createStyles({
    progress: {
      color: '#fb0'
    }
  });

export const Loading = withStyles(styles)(({ classes }: LoadingProps) => (
  <Layout className="loading">
    <CircularProgress className={classes.progress} size={50} />
  </Layout>
));
