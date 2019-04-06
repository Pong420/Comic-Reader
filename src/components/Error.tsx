import React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import WarningIcon from '@material-ui/icons/WarningRounded';
import { Layout } from './Layout';
import { ApiError } from '../typings';

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
  const defaultStatusText = '出現錯誤';
  const { statusText } = response || {
    statusText: defaultStatusText
  };

  return (
    <Layout className="error">
      <WarningIcon className={classes.warning} color="secondary" />
      <div className="error-status-text">{statusText || defaultStatusText}</div>
    </Layout>
  );
}

export const Error = withStyles(styles)(ErrorComponent);
