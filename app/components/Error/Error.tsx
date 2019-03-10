import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import WarningIcon from '@material-ui/icons/WarningRounded';
import { Layout } from '../Layout';
import { ApiError } from '../../../typing';

export interface ErrorProps {
  reload?: () => void;
}

const styles = () =>
  createStyles({
    warning: {
      fontSize: 100
    }
  });

// TODO:
// handle reload

function ErrorComponent({
  classes,
  response
}: ErrorProps & ApiError & WithStyles<typeof styles>) {
  const { statusText } = response || {
    statusText: '出現錯誤'
  };

  return (
    <Layout className="error">
      <WarningIcon className={classes.warning} color="secondary" />
      <div className="error-status-text">{statusText}</div>
    </Layout>
  );
}

export const Error = withStyles(styles)(ErrorComponent);
