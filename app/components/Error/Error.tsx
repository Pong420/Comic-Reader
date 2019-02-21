import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Warning from '@material-ui/icons/WarningRounded';
import { AxiosError } from 'axios';
import { Layout } from '../Layout';

export interface ErrorProps extends AxiosError, WithStyles<typeof styles> {
  reload?: () => void;
}

const styles = () =>
  createStyles({
    warning: {
      fontSize: 60
    }
  });

export const Error = withStyles(styles)(({ classes, response }: ErrorProps) => {
  const { status, statusText = '出現錯誤' } = response;

  return (
    <Layout className="error">
      <Warning className={classes.warning} />
      <div className="error-status">{status}</div>
      <div className="error-status-text">{statusText}</div>
    </Layout>
  );
});
