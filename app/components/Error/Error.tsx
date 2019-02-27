import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Warning from '@material-ui/icons/WarningRounded';
import { AxiosError } from 'axios';
import { Layout } from '../Layout';

export interface ErrorProps {
  reload?: () => void;
}

const styles = () =>
  createStyles({
    warning: {
      fontSize: 60
    }
  });

// TODO:
// handle reload

function ErrorComponent({
  classes,
  response
}: ErrorProps & AxiosError & WithStyles<typeof styles>) {
  const { status, statusText } = response || {
    status: 0,
    statusText: '出現錯誤'
  };

  return (
    <Layout className="error">
      <Warning className={classes.warning} />
      <div className="error-status">{status}</div>
      <div className="error-status-text">{statusText}</div>
    </Layout>
  );
}

export const Error = withStyles(styles)(ErrorComponent);
